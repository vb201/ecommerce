import { atom } from 'jotai';

export const cartQuantityAtom = atom(0);

export const cartAmountAtom = atom(0);
export const cartAtom = atom([]);

export const authAtom = atom('');
export const userAtom = atom({});
export const loggedInAtom = atom(false);
