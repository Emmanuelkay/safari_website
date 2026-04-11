/**
 * Seed Firestore with packages from the static config.
 * Run this ONCE from the browser console or via an admin button.
 *
 * Usage in browser console:
 *   import { seedPackages } from '/src/utils/seedPackages.js';
 *   seedPackages();
 */
import { db } from '../lib/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { packagesData, signatureAddons, practicalAddons } from '../data/packages';

export async function seedPackages() {
  // Check if already seeded
  const existing = await getDocs(collection(db, 'packages'));
  if (!existing.empty) {
    console.log(`Firestore already has ${existing.size} packages. Skipping seed.`);
    return { skipped: true, count: existing.size };
  }

  // Seed packages
  for (const pkg of packagesData) {
    await setDoc(doc(db, 'packages', `pkg_${pkg.id}`), pkg);
  }

  // Seed addons
  for (const addon of signatureAddons) {
    await setDoc(doc(db, 'addons', addon.id), { ...addon, type: 'signature' });
  }
  for (const addon of practicalAddons) {
    await setDoc(doc(db, 'addons', addon.id), { ...addon, type: 'practical' });
  }

  console.log(`Seeded ${packagesData.length} packages and ${signatureAddons.length + practicalAddons.length} addons.`);
  return { seeded: true, packages: packagesData.length, addons: signatureAddons.length + practicalAddons.length };
}
