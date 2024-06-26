import "./index.css";
import { fetchHomePageData } from "./interactor/dataApi.mjs";
import {
  getHomePageSets,
  generateUI,
  registerNavEventListener,
  setRefSetLazyLoadObserver,
  setFocusOnFirstTile,
  populateContentGrid,
} from "./app/index.mjs";

fetchHomePageData()
  .then(getHomePageSets)
  .then(generateUI)
  .then(setRefSetLazyLoadObserver)
  .then(populateContentGrid)
  .then(setFocusOnFirstTile)
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
