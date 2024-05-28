import { fetchHomePageData, getRefIdSets } from "./interactor/dataApi.mjs";
import {
  getHomePageSets,
  generateUI,
  registerNavEventListener,
  createTiles,
  imageSrc,
} from "./utils.mjs";

fetchHomePageData()
  .then(getHomePageSets)
  .then(generateUI)
  .then((refSetData) => {
    // lazy load the content rows
    setTimeout(() => {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const row = document.getElementById(entry.target.id);
            const contentRow = document.createElement("div");
            contentRow.className = "content-row";

            // make api call and append to the row
            getRefIdSets(entry.target.id)
              .then((items) => {
                createTiles(items.map(imageSrc), contentRow);
              })
              .then(() => {
                row.nextSibling.replaceWith(contentRow);
              })
              .catch((err) => {
                console.error(
                  `Error fetching data for ${entry.target.id}`,
                  err
                );
              })
              .then(() => {
                observer.unobserve(entry.target);
              });
          }
        });
      });

      refSetData.forEach((row) => {
        let target = document.getElementById(row.refId);
        observer.observe(target);
      });
    }, 5);
  })
  .then(() => {
    // focus on the first tile
    const tiles = document.querySelectorAll(".tile");
    tiles[0]?.classList.add("focused");
  })
  .then(registerNavEventListener)
  .catch((err) => {
    console.error(err);
    // display error page

    const root = document.getElementById("root");
    const errorPage = document.createElement("div");
    errorPage.className = "error-page";
    errorPage.innerText = "Oops! Something went wrong. Please try again later.";
    root.append(errorPage);
  });
