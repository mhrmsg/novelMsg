import { IDataType } from "../types";
import myRequest from "..";

export function getAllNovelData(url: string) {
  return myRequest.get<IDataType>({
    url: url,
  });
}

export function getRandomNovelData(url: string) {
  return myRequest.get<IDataType>({
    url: url,
  });
}
