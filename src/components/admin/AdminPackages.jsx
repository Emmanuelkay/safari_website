import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { cn } from '../../lib/utils';
import { Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronUp, Package, Upload, ImagePlus } from 'lucide-react';
import { seedPackages } from '../../utils/seedPackages';

const EMPTY_PACKAGE = {
  id: 0,
  category: '',
  image: '',
  price: 0,
  solo: 0,
  group: '',
  flagship: false,
  stay: { tier: 'COMFORT', nights: 0, board: '' },
  itinerary: [],
};

const EMPTY_DAY = {
  day: 1,
  location: '',
  morning: '',
  afternoon: '',
  evening: '',
  journal: '',
  overnight: { name: '', board: '', room: '' },
};

const IMG_WIDTH = 800;
const IMG_HEIGHT = 512;
const IMG_ASPECT = `${IMG_WIDTH}/${IMG_HEIGHT}`;

const ImageUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB.');
      return;
    }

    setUploading(true);
    try {
      const filename = `packages/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onChange(url);
    } catch (err) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">Package Image</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer border-2 border-dashed border-zinc-200 hover:border-gold rounded-lg overflow-hidden transition-colors"
        style={{ aspectRatio: IMG_ASPECT }}
      >
        {value ? (
          <img src={value} alt="Package" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300">
            <ImagePlus size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest mt-2">
              {uploading ? 'Uploading...' : 'Click to upload'}
            </span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {value && (
        <div className="mt-2 flex items-center gap-2">
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Or paste image URL"
            className="flex-1 border border-zinc-200 rounded p-2 text-[11px] text-zinc-500 truncate"
          />
          <button onClick={() => onChange('')} className="text-red-400 hover:text-red-600 text-[10px] font-bold">Clear</button>
        </div>
      )}
      <p className="text-[9px] text-zinc-400 mt-1">Recommended: {IMG_WIDTH}x{IMG_HEIGHT}px. Max 5MB. JPG, PNG, or WebP.</p>
    </div>
  );
};

const PackageForm = ({ pkg, onSave, onCancel }) => {
  const [form, setForm] = useState(pkg);
  const [saving, setSaving] = useState(false);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const updateStay = (field, value) => setForm(prev => ({ ...prev, stay: { ...prev.stay, [field]: value } }));

  const updateDay = (idx, field, value) => {
    const newItinerary = [...form.itinerary];
    newItinerary[idx] = { ...newItinerary[idx], [field]: value };
    setForm(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const updateOvernight = (idx, field, value) => {
    const newItinerary = [...form.itinerary];
    newItinerary[idx] = {
      ...newItinerary[idx],
      overnight: { ...newItinerary[idx].overnight, [field]: value }
    };
    setForm(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addDay = () => {
    setForm(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { ...EMPTY_DAY, day: prev.itinerary.length + 1 }]
    }));
  };

  const removeDay = (idx) => {
    setForm(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }))
    }));
  };

  const handleSave = async () => {
    if (!form.id || !form.price) {
      alert('Package ID and price are required.');
      return;
    }
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-custom border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-ivory/30">
        <h3 className="font-heading text-xl text-charcoal">{pkg.id ? `Edit Package #${pkg.id}` : 'New Package'}</h3>
        <button onClick={onCancel} className="text-zinc-400 hover:text-charcoal"><X size={20} /></button>
      </div>

      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Basic Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Package ID</label>
            <input type="number" value={form.id} onChange={e => update('id', parseInt(e.target.value) || 0)}
              className="w-full border border-zinc-200 rounded p-3 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Price (USD pp)</label>
            <input type="number" value={form.price} onChange={e => update('price', parseFloat(e.target.value) || 0)}
              className="w-full border border-zinc-200 rounded p-3 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Solo Supplement</label>
            <input type="number" value={form.solo} onChange={e => update('solo', parseFloat(e.target.value) || 0)}
              className="w-full border border-zinc-200 rounded p-3 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Group Rate</label>
            <input value={form.group || ''} onChange={e => update('group', e.target.value)}
              placeholder="e.g. $550pp for 4+"
              className="w-full border border-zinc-200 rounded p-3 text-sm" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Category Tags</label>
          <input value={form.category} onChange={e => update('category', e.target.value)}
            placeholder="safari 3-days solo with-stays mara"
            className="w-full border border-zinc-200 rounded p-3 text-sm" />
        </div>

        <ImageUpload value={form.image} onChange={(url) => update('image', url)} />

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.flagship || false} onChange={e => update('flagship', e.target.checked)}
              className="w-4 h-4 accent-gold" />
            <span className="text-sm font-medium text-charcoal">Flagship Experience</span>
          </label>
        </div>

        {/* Stay Details */}
        <div className="border-t border-zinc-100 pt-6">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-gold mb-4">Accommodation</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Tier</label>
              <select value={form.stay.tier} onChange={e => updateStay('tier', e.target.value)}
                className="w-full border border-zinc-200 rounded p-3 text-sm">
                <option value="COMFORT">COMFORT</option>
                <option value="PREMIUM">PREMIUM</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Nights</label>
              <input type="number" value={form.stay.nights} onChange={e => updateStay('nights', parseInt(e.target.value) || 0)}
                className="w-full border border-zinc-200 rounded p-3 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Board</label>
              <input value={form.stay.board} onChange={e => updateStay('board', e.target.value)}
                placeholder="Full Board"
                className="w-full border border-zinc-200 rounded p-3 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1">Room Type</label>
              <input value={form.stay.room || ''} onChange={e => updateStay('room', e.target.value)}
                placeholder="Double Tent"
                className="w-full border border-zinc-200 rounded p-3 text-sm" />
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="border-t border-zinc-100 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gold">Itinerary ({form.itinerary.length} days)</h4>
            <button onClick={addDay} className="flex items-center gap-1 text-[11px] font-bold text-gold hover:text-charcoal">
              <Plus size={14} /> Add Day
            </button>
          </div>

          <div className="space-y-6">
            {form.itinerary.map((day, idx) => (
              <div key={idx} className="bg-zinc-50 rounded-lg p-5 border border-zinc-100">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-bold text-charcoal text-sm">Day {day.day}</h5>
                  <button onClick={() => removeDay(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Location</label>
                    <input value={day.location} onChange={e => updateDay(idx, 'location', e.target.value)}
                      className="w-full border border-zinc-200 rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Morning</label>
                    <textarea value={day.morning} onChange={e => updateDay(idx, 'morning', e.target.value)}
                      rows={2} className="w-full border border-zinc-200 rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Afternoon</label>
                    <textarea value={day.afternoon} onChange={e => updateDay(idx, 'afternoon', e.target.value)}
                      rows={2} className="w-full border border-zinc-200 rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Evening</label>
                    <textarea value={day.evening} onChange={e => updateDay(idx, 'evening', e.target.value)}
                      rows={2} className="w-full border border-zinc-200 rounded p-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Journal Note</label>
                    <textarea value={day.journal} onChange={e => updateDay(idx, 'journal', e.target.value)}
                      rows={2} className="w-full border border-zinc-200 rounded p-2 text-sm italic" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-zinc-200">
                    <div>
                      <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Overnight Name</label>
                      <input value={day.overnight.name} onChange={e => updateOvernight(idx, 'name', e.target.value)}
                        className="w-full border border-zinc-200 rounded p-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Board</label>
                      <input value={day.overnight.board} onChange={e => updateOvernight(idx, 'board', e.target.value)}
                        className="w-full border border-zinc-200 rounded p-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Room</label>
                      <input value={day.overnight.room} onChange={e => updateOvernight(idx, 'room', e.target.value)}
                        className="w-full border border-zinc-200 rounded p-2 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="p-6 border-t border-zinc-100 flex justify-end gap-4 bg-zinc-50">
        <button onClick={onCancel} className="px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-charcoal">
          Cancel
        </button>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-gold text-charcoal rounded-custom text-[11px] font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-transform shadow-lg disabled:opacity-50">
          <Save size={14} /> {saving ? 'Saving...' : 'Save Package'}
        </button>
      </div>
    </div>
  );
};

export const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list view, object = form view

  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPackages(snapshot.docs.map(doc => ({ _docId: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (pkg) => {
    const docId = pkg._docId || `pkg_${pkg.id}`;
    const { _docId, ...data } = pkg;
    await setDoc(doc(db, 'packages', docId), data);
    setEditing(null);
  };

  const handleDelete = async (pkg) => {
    if (!confirm(`Delete package #${pkg.id}? This cannot be undone.`)) return;
    await deleteDoc(doc(db, 'packages', pkg._docId));
  };

  if (loading) {
    return <div className="p-20 text-center animate-pulse italic text-zinc-400">Loading packages...</div>;
  }

  if (editing) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-4xl font-heading text-charcoal mb-2">Package Editor</h2>
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest opacity-70">
            Edit pricing, itinerary, and details
          </p>
        </div>
        <PackageForm pkg={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading text-charcoal mb-2">Package Management</h2>
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest opacity-70">
            {packages.length} packages — edit prices, itineraries, and details
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY_PACKAGE, id: packages.length + 1 })}
          className="flex items-center gap-2 bg-gold text-charcoal px-6 py-3 rounded-custom text-[11px] font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-transform shadow-lg"
        >
          <Plus size={16} /> Add Package
        </button>
      </div>

      {packages.length === 0 ? (
        <div className="bg-white rounded-custom border border-zinc-200 p-16 text-center">
          <Package size={48} className="text-zinc-200 mx-auto mb-6" />
          <h3 className="font-heading text-2xl text-charcoal mb-2">No packages yet</h3>
          <p className="text-zinc-400 text-sm mb-8">Import your existing packages or create new ones manually.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={async () => {
                const result = await seedPackages();
                if (result.seeded) alert(`Imported ${result.packages} packages and ${result.addons} addons.`);
                else alert('Packages already exist in Firestore.');
              }}
              className="flex items-center gap-2 bg-charcoal text-ivory px-8 py-3 rounded-custom text-[11px] font-bold uppercase tracking-widest"
            >
              <Upload size={14} /> Import from Config
            </button>
            <button
              onClick={() => setEditing({ ...EMPTY_PACKAGE, id: 1 })}
              className="bg-gold text-charcoal px-8 py-3 rounded-custom text-[11px] font-bold uppercase tracking-widest"
            >
              Create Manually
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-custom border border-zinc-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Solo</th>
                <th className="px-6 py-4">Nights</th>
                <th className="px-6 py-4">Days</th>
                <th className="px-6 py-4">Flagship</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {packages.map((pkg) => (
                <tr key={pkg._docId} className="border-t border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gold">#{pkg.id}</td>
                  <td className="px-6 py-4">
                    {pkg.image && <img src={pkg.image} alt="" className="w-16 h-10 rounded object-cover" style={{ aspectRatio: IMG_ASPECT }} />}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pkg.category?.split(' ').slice(0, 3).map(tag => (
                        <span key={tag} className="bg-zinc-100 px-2 py-0.5 text-[9px] font-bold uppercase rounded">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-charcoal">${pkg.price}</td>
                  <td className="px-6 py-4 text-zinc-500">+${pkg.solo}</td>
                  <td className="px-6 py-4 text-zinc-500">{pkg.stay?.nights || 0}</td>
                  <td className="px-6 py-4 text-zinc-500">{pkg.itinerary?.length || 0}</td>
                  <td className="px-6 py-4">
                    {pkg.flagship && <span className="bg-gold/20 text-gold px-2 py-0.5 text-[9px] font-bold rounded uppercase">Yes</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(pkg)}
                        className="p-2 hover:bg-zinc-100 rounded text-zinc-400 hover:text-charcoal transition-colors"
                        aria-label="Edit package">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(pkg)}
                        className="p-2 hover:bg-red-50 rounded text-zinc-400 hover:text-red-500 transition-colors"
                        aria-label="Delete package">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
