import { IDataType } from "../types";
import myRequest from "..";

export function getAllNovelData(url: string) {
  return myRequest.get<IDataType>({
    url: url,
  });
}

export function getNovelCount(url: string) {
  return myRequest.get<IDataType>({
    url: url,
  });
}

export function getNovelDataByParams(
  url: string,
  page: number,
  pagesize: number
) {
  return myRequest.get<IDataType>({
    url: url,
    params: {
      page: page,
      pagesize: pagesize,
    },
  });
}

export function getRandomNovelData(url: string) {
  return myRequest.get<IDataType>({
    url: url,
  });
}
