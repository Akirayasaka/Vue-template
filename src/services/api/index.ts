import * as demoApi from './demo/demoApi';

/** API service for handling http requests */
export const apiService = {
  /** API範例 */
  demo: {
    demo1: demoApi.getTagsItem,
    demo2: demoApi.getTagsItem2
  }
  // 根據需求功能繼續擴充其他API服務
};
