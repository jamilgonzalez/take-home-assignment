import { fetchHomePageData } from "./interactor/dataApi.mjs";
import {
  getHomePageSets,
  generateUI,
  registerNavEventListener,
  lazyLoadCallback,
} from "./utils.mjs";

const LAZY_LOAD_DELAY = 5;

fetchHomePageData()
  .then(getHomePageSets)
  .then(generateUI)
  .then((refSetData) => {
    // lazy load the "ref" sets
    setTimeout(() => {
      let observer = new IntersectionObserver(lazyLoadCallback);
      refSetData.forEach((row) => {
        let target = document.getElementById(row.refId);
        observer.observe(target);
      });
    }, LAZY_LOAD_DELAY);
  })
  .then(() => {
    // focus on the first tile on page load
    const tiles = document.querySelectorAll(".tile");
    if (tiles.length > 0) tiles[0]?.classList.add("focused");
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
