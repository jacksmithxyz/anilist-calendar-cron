import { ANILIST_BASE_URL, QUERY } from "./consts.ts";
import { AnilistResponse, DbAnimeEntry, MediaEntry } from "./types.ts";

/** Returns all anime which have a specified start date
 * @param mediaList - list of media objects returned from the AniList API
 * @returns list of media objects which have a specified start date
 */

function getFilteredAnime(mediaList: MediaEntry[]) {
  const filteredAnime = [];
  for (const anime of mediaList) {
    if (anime.startDate.day != null) {
      const dbEntry = toAnimeDbEntry(anime)
      filteredAnime.push(dbEntry);
    }
  }
  return filteredAnime;
}

/** Converts MediaEntry from AniList response to a format suitable for database storage
 */

function toAnimeDbEntry(media: MediaEntry) {
  const dbEntry: DbAnimeEntry = {};

  dbEntry.anilistId = media.id
  dbEntry.title = media.title.english || media.title.romaji;
  dbEntry.releaseDate = new Date(Date.UTC(
    media.startDate.year,
    media.startDate.month !== undefined ? media.startDate.month - 1 : 0,
    media.startDate.day,
  ));
  dbEntry.description = media.description
  dbEntry.siteUrl = media.siteUrl
  dbEntry.coverImage = media.coverImage

  return dbEntry
}

/** Returns a single page of media entries from the AniList API
 * @param queryVariables - An object containing a key-value pair with a page number
 * @returns list of media objects
 */

async function fetchUpcomingAnimePage(queryVariables) {
  const response = await fetch(ANILIST_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: queryVariables,
    }),
  });
  const pageData: AnilistResponse = await response.json();

  return pageData;
}

async function main() {
  const queryVariables = {
    page: 1,
  };
  const initalResponse = await fetchUpcomingAnimePage(queryVariables);
  let hasNextPage = initalResponse.data.Page.pageInfo.hasNextPage;

  const mediaList = initalResponse.data.Page.media;

  while (hasNextPage) {
    queryVariables.page++;
    const response = await fetchUpcomingAnimePage(queryVariables);
    hasNextPage = response.data.Page.pageInfo.hasNextPage;
    mediaList.push(...response.data.Page.media);
  }

  const filteredAnime = getFilteredAnime(mediaList);
  console.log(filteredAnime)
}

main();
