import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { packagesData as staticPackages, signatureAddons as staticSignature, practicalAddons as staticPractical } from '../data/packages';

/**
 * Reads packages from Firestore. Falls back to static data if Firestore
 * is empty (first deploy) or unreachable (offline).
 */
export const usePackages = () => {
  const [packages, setPackages] = useState(staticPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('id', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Firestore has no packages yet — use static fallback
        setPackages(staticPackages);
      } else {
        setPackages(snapshot.docs.map(doc => ({ _docId: doc.id, ...doc.data() })));
      }
      setLoading(false);
    }, () => {
      // Error (offline, permission denied) — use static fallback
      setPackages(staticPackages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { packages, loading };
};

export const useAddons = () => {
  const [signature, setSignature] = useState(staticSignature);
  const [practical, setPractical] = useState(staticPractical);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubSig = onSnapshot(collection(db, 'addons'), (snapshot) => {
      if (snapshot.empty) {
        setSignature(staticSignature);
        setPractical(staticPractical);
      } else {
        const all = snapshot.docs.map(doc => ({ _docId: doc.id, ...doc.data() }));
        setSignature(all.filter(a => a.type === 'signature'));
        setPractical(all.filter(a => a.type === 'practical'));
      }
      setLoading(false);
    }, () => {
      setSignature(staticSignature);
      setPractical(staticPractical);
      setLoading(false);
    });

    return () => unsubSig();
  }, []);

  return { signature, practical, loading };
};
