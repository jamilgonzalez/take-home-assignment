export const itemsWithData = (item) => {
  const { text = {}, ratings = [] } = item;
  return (
    (text?.title?.full?.series?.default?.content ||
      text?.title?.full?.program?.default?.content ||
      text?.title?.full?.default?.default?.content ||
      text?.title?.full?.collection?.default?.content) &&
    ratings.length > 0
  );
};
