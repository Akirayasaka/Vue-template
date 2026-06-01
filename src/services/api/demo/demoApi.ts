import { axiosHelper } from '../axiosHelper';

export const getTagsItem = () =>
  axiosHelper.get('https://apiservice.mol.gov.tw/OdService/rest/tag?limit=50&offset=0');
export const getTagsItem2 = () =>
  axiosHelper.get('https://apiservice.mol.gov.tw/OdService/rest/tag?limit=50&offset=50');
