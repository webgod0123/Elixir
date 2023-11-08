import { selector } from "recoil";
import { userListState, filterState, nationalityState } from "./atoms";

export const filteredUserListState = selector({
  key: "filteredUserListState",
  get: ({ get }) => {
    const list = get(userListState);
    const filter = get(filterState);
    const nationalities = get(nationalityState);
  },
});
