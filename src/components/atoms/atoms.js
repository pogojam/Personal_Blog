import { atom, useRecoilState, useRecoilValue } from "recoil"
export const activeSectionState = atom({
  id: "ActiveSection",
  default: "hero",
})
