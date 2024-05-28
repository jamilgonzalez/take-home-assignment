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
    // lazy load the "ref" sets
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
                // remove the row if there is an error
                // add monitoring so that we are alerted when this happens
                console.log(`Error fetching data for ${entry.target.id}`, err);
                row.remove();
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
    console.error(`Error fetching home page data`, err);

    // display error page
    const root = document.getElementById("root");
    const errorPage = document.createElement("div");
    errorPage.className = "error-page";
    errorPage.innerText = "Oops! Something went wrong. Please try again later.";
    root.append(errorPage);
  });
