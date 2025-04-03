import { ChangeEvent } from "react";
import { HeaderItem } from "../models/HeaderItem";
import { LocalFile, parse, ParseResult } from "papaparse";

export class CsvHelper {
  // private static prepareHeaderItems = (fields: string[]): HeaderItem[] => {
  //   return fields.map((field, index) => ({ id: index, text: field }));
  // };
  // /**
  //  * Parses a CSV file and returns its content as an array of objects.
  //  * @param filePath - The path to the CSV file.
  //  * @returns An array of objects representing the rows in the CSV file.
  //  */
  // public static parseFile = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   type: "from" | "to"
  // ): HeaderItem[] => {
  //   if (event?.target?.files) {
  //     const file: File = event.target.files[0] as File;
  //     const config = {
  //       header: true,
  //       complete: (results: ParseResult<File>, file: LocalFile): void => {
  //         if (results?.meta?.fields) {
  //           console.log("Fields:", results.meta.fields);
  //           return this.prepareHeaderItems(results.meta.fields);
  //         }
  //       },
  //       error: (error: unknown, file: LocalFile): void => {
  //         console.error("Error parsing file:", error);
  //       },
  //     };
  //     parse<File>(file, config);
  //   }
  // };
  // /**
  //  * Writes an array of objects to a CSV file.
  //  * @param filePath - The path to the output CSV file.
  //  * @param data - The array of objects to write.
  //  */
}
