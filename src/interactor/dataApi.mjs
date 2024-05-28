const DATA_API = {
  baseUrl: "https://cd-static.bamgrid.com/dp-117731241344",
};

export async function fetchHomePageData() {
  return fetch(`${DATA_API.baseUrl}/home.json`).then((res) => res.json());
}

export async function getRefIdSetItems(refId) {
  return fetch(`${DATA_API.baseUrl}/sets/${refId}.json`)
    .then((res) => res.json())
    .then((body) => {
      const { data } = body;
      const items =
        data.CuratedSet?.items ??
        data.PersonalizedCuratedSet?.items ??
        data.TrendingSet?.items;

      if (!items ?? items.length === 0) {
        const errorMessage = `No items found for refId: ${refId}`;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      return items;
    });
}
