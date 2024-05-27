import { atom } from 'jotai';
import { getCookie } from '@utils/get-cookie';
import { hasToken } from '@utils/has-token';

const username = getCookie('username');
const isUserHasToken = hasToken();

export const usernameAtom = atom(username);
export const authorizedAtom = atom(isUserHasToken);
