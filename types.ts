/* These interfaces don't map exactly to the AniList API,
 and are built around the returned values in the QUERY object in consts.ts.
*/

export interface DbAnimeEntry {
  anilistId: number;
  title: string;
  releaseDate: Date;
  description: string;
  coverImage: string;
  siteUrl: string;
}

interface StartDate {
  // We can filter for year in the AniList query so this is always a number
  year: number;
  month?: number;
  day?: number;
}

interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

interface PageData {
  pageInfo: PageInfo;
  media: MediaEntry[];
}

export interface MediaEntry {
  id: number;
  title: {
    english?: string;
    romaji: string;
  };
  startDate: StartDate;
  description: string;
  coverImage: string;
  siteUrl: string;
}

export interface AnilistResponse {
  data: {
    Page: PageData;
  };
}
