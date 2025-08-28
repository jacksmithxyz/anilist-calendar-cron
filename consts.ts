export const ANILIST_BASE_URL = "https://graphql.anilist.co"
export const QUERY = `query UpcomingAnimePage($page: Int = 1) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
    }
    media(
      type: ANIME
      status: NOT_YET_RELEASED
      sort: [POPULARITY_DESC]
      startDate_greater: 20000000
    ) {
      id
      title {
        english
        romaji
      }
      description
      startDate {
        year
        month
        day
      }
      coverImage {
        large
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
      siteUrl
    }
  }
}
`