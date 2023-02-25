export interface IGetWallPapersResponse {
    total: number;
    totalHits: number;
    hits: IWallPaper[];
}

export interface IWallPaper {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    fullHDURL: string;
    imageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}


export type Orientation = 'all' | 'horizontal' | 'vertical'
export type Order = 'popular' | 'latest'

export interface IParamObj {
  q: string,
  orientation: 'all' | 'horizontal' | 'vertical',
  order: 'popular' | 'latest',
  page: string,
  per_page: string
}