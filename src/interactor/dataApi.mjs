const DATA_API = {
  baseUrl: "https://cd-static.bamgrid.com/dp-117731241344",
};

export async function fetchHomePageData() {
  return fetch(`${DATA_API.baseUrl}/home.json`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(`Error fetching home page data`, err);
      throw Error(`Error fetching home page data`);
    });
}

export async function getRefIdSets(refId) {
  return fetch(`${DATA_API.baseUrl}/sets/${refId}.json`)
    .then((res) => res.json())
    .then((body) => {
      const { data } = body;
      return (
        data.CuratedSet?.items ??
        data.PersonalizedCuratedSet?.items ??
        data.TrendingSet?.items ??
        []
      );
    });
}
