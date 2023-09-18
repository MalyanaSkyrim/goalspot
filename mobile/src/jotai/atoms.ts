import {atom} from 'jotai';
import type {User} from '../../../server/prisma';

export const isAuthenticatedAtom = atom(false);
export const userAtom = atom<Omit<User, 'password'> | null>(null);
