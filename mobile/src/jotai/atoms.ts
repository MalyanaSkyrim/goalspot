import {atom} from 'jotai';
import type {Pitch, PitchImage, User} from 'server/prisma';

export const isAuthenticatedAtom = atom(true);
export const userAtom = atom<
  | (Omit<User, 'password'> & {pitches: (Pitch & {images: PitchImage[]})[]})
  | null
>(null);
