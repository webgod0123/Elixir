// atoms.ts
import { atom } from "recoil";
import {UserType} from './types';

export const userListState = atom<UserType[]>({
  key: 'userListState',
  default: [],
});

export const filterState = atom({
  key: "filterState",
  default: "",
});

export const nationalityState = atom<string[]>({
  key: "nationalityState",
  default: [],
});

export const selectedUserState = atom<UserType | null>({
  key: 'selectedUserState',
  default: null,
});
