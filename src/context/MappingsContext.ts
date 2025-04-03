import { createContext } from "react";
import { HeaderMapping } from "../models/HeaderMapping";

export type MappingsContextType = {
  mappings: HeaderMapping[];
  confirmMapping: (id: number) => void;
  deleteMapping: (id: number) => void;
};

export const MappingsContext = createContext<MappingsContextType>({
  mappings: [],
  confirmMapping: (id: number) => {},
  deleteMapping: (id: number) => {},
});
