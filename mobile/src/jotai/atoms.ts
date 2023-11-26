import {atom} from 'jotai';
import type {User} from 'server/prisma';

export const isAuthenticatedAtom = atom(true);
export const userAtom = atom<Omit<User, 'password'> | null>(null);
