export default class StringHelper {
  public static isEmpty(str: string): boolean {
    return str === null || str === undefined || str === "";
  }
}
