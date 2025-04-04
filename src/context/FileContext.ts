import { ChangeEvent, createContext } from "react";

export type FileContextType = {
  onFileLoad: (
    event: ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => void;
  onFileSave: () => void;
};

export const FileContext = createContext<FileContextType>({
  onFileLoad: (event: ChangeEvent<HTMLInputElement>, type: "from" | "to") => {},
  onFileSave: () => {},
});
