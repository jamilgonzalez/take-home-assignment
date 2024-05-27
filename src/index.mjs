import { fetchHomePageData } from "./interactor/dataApi.mjs";
import {
  getHomePageSets,
  generateUI,
  registerNavEventListener,
  getRefSets,
} from "./utils.mjs";

fetchHomePageData()
  .then(getHomePageSets)
  .then(getRefSets)
  .then(generateUI)
  .then(registerNavEventListener)
  .catch((err) => {
    console.error(err);
    // render error message
  });
