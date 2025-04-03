import { ChangeEvent } from "react";
import { HeaderItem } from "../models/HeaderItem";
import { LocalFile, parse, ParseResult } from "papaparse";
import { CsvDownloadData } from "../models/CsvDownloadData";

export class CsvHelper {
  // private static convertToCSV = (data) => {
  //   const headers = Object.keys(data[0]).join(",");
  //   const rows = data.map((obj) => Object.values(obj).join(",")).join("\n");
  //   return `${headers}\n${rows}`;
  // };
  // public static prepareCsvData = (data: CsvDownloadData): void => {};

  // /**
  //  * Maps the csv data in to an array the app can work with.
  //  * @param fields - array of field names as strings.
  //  * @returns An array of items representing header data.
  //  */
  public static prepareHeaderItems = (fields: string[]): HeaderItem[] => {
    if (!fields.length) {
      return [];
    }
    return fields.map((field, index) => ({ id: index, text: field }));
  };

  // /**
  //  * Parses a CSV file and returns its content as an array of objects.
  //  * @param filePath - The path to the CSV file.
  //  * @returns An array of objects representing the rows in the CSV file.
  //  */
  public static parseFile = (
    event: ChangeEvent<HTMLInputElement>,
    type: "from" | "to",
    completionCallback: (results: ParseResult<File>, file: LocalFile) => void
  ): void => {
    if (event?.target?.files) {
      const file: File = event.target.files[0] as File;
      const config = {
        header: true,
        complete: completionCallback,
        error: (error: unknown, file: LocalFile): void => {
          console.error("Error parsing file:", error);
        },
      };
      parse<File>(file, config);
      return;
    }
    throw new Error(
      `No file found in event.target.files: ${event?.target?.files}`
    );
  };
  // /**
  //  * Writes an array of objects to a CSV file.
  //  * @param filePath - The path to the output CSV file.
  //  * @param data - The array of objects to write.
  //  */
}
