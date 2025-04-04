import { HeaderMapping } from "./HeaderMapping";

export type CsvDownloadData = {
  headerMappings: HeaderMapping[];
  fromColumns: string[];
  fromRows: string[];
};
