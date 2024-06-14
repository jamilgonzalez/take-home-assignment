export const transformToRowContent = (item) => {
  const { image = {}, text, ratings, collectionId = "" } = item;
  const title =
    text?.title?.full?.series?.default?.content ??
    text?.title?.full?.program?.default?.content ??
    text?.title?.full?.default?.default?.content ??
    text?.title?.full?.collection?.default?.content;
  console.log(title);
  return {
    collectionId,
    tileContent: {
      imgSrc:
        image?.tile?.["1.78"]?.series?.default?.url ??
        image?.tile?.["1.78"]?.program?.default?.url ??
        image?.tile?.["1.78"]?.default?.default?.url,
      title, // if there's an error fetching img we will display title on default img
    },
    modalContent: {
      imgSrc:
        image?.background?.["1.78"]?.series?.default?.url ??
        image?.background?.["1.78"]?.program?.default?.url ??
        image?.background?.["1.78"]?.default?.default?.url,
      title,
      ratings,
      // can add more content here
    },
  };
};
