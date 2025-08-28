import { ANILIST_BASE_URL, QUERY } from "./consts.ts";

/** Returns all anime which have a specified start date
 * @param mediaList - list of media objects returned from the AniList API
 * @returns list of media objects which have a specified start date
 */

function getFilteredAnime(mediaList) {
  const filteredAnime = [];
  for (const anime of mediaList) {
    if (anime.startDate.day != null) {
      filteredAnime.push(anime);
    }
  }
  return filteredAnime;
}

/** Returns a single page of media entries from the AniList API
 * @param variables - An object containing a key-value pair with a page number
 * @returns list of media objects
 */

async function fetchUpcomingAnimePage(variables) {
  const response = await fetch(ANILIST_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables,
    }),
  });
  const pageData = await response.json();

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
    mediaList.push(...response.data.Page.media)
  }

  const filteredAnime = getFilteredAnime(mediaList);
  console.log(filteredAnime;
}

main();
