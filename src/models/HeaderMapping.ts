import { HeaderItem } from "./HeaderItem";

export type HeaderMapping = {
  id: number;
  mapFromColumn: HeaderItem;
  mapToColumn: HeaderItem;
  confirmed: boolean;
};
