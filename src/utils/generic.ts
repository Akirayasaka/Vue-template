import { type AxiosResponse } from 'axios';
import { HttpStatusCode } from '@/types/enum/httpStatusCode';

/** 下載PDF */
export function download_PDF(fileData: string, fileName: string, preview?: boolean): void {
  const linkSource = `data:application/pdf;base64,${fileData}`;
  if (preview) {
    fetch(linkSource)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((blobUrl) => window.open(blobUrl));
  } else {
    const downloadLink = document.createElement('a');
    const name = fileName;

    downloadLink.href = linkSource;
    downloadLink.download = name;
    downloadLink.click();
  }
}

/** 確認API回傳狀態 */
export function checkApiResponse(
  apiResult: AxiosResponse,
  httpStatusCode = HttpStatusCode.OK
): boolean {
  return apiResult && apiResult.status === httpStatusCode;
}

/** 字串陣列排除重複 */
export function distinctStringArray(stringArr: string[]): Array<string> {
  return Array.from(new Set(stringArr));
}

/** 物件陣列排除重複(回傳字串) */
export function distinctObjectArray(objArr: object[], key: keyof object): Array<string> {
  return [...new Set(objArr.map((x) => x[key]))];
}

/** 物件陣列排除重複(回傳物件) */
export function distinctObjectArray2(objArr: object[], key: keyof object): Array<object> {
  return [...new Map(objArr.map((x) => [x[key], x])).values()];
}
