import { createContext } from "react";
import { HeaderItem } from "../models/HeaderItem";

export type HeadersContextType = {
  headersFrom: HeaderItem[];
  headersTo: HeaderItem[];
  headerClicked: (id: number, type: "from" | "to") => void;
};

export const HeadersContext = createContext<HeadersContextType>({
  headersFrom: [],
  headersTo: [],
  headerClicked: (id: number, type: "from" | "to") => {},
});
