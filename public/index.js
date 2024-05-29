/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/default_tile.png":
/*!*************************************!*\
  !*** ./src/assets/default_tile.png ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"images/default_tile.png\");\n\n//# sourceURL=webpack://takehomeassignment/./src/assets/default_tile.png?");

/***/ }),

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interactor/dataApi.mjs */ \"./src/interactor/dataApi.mjs\");\n/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ \"./src/utils.mjs\");\n\n\n\n(0,_interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__.fetchHomePageData)()\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.getHomePageSets)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.generateUI)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.setRefSetLazyLoadObserver)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.populateContentGrid)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.setFocusOnFirstTile)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.registerNavEventListener)\n  .catch((err) => {\n    console.error(`Error fetching home page data`, err);\n    // display error page\n    const root = document.getElementById(\"root\");\n    const errorPage = document.createElement(\"div\");\n    errorPage.className = \"error-page\";\n    errorPage.innerText = \"Oops! Something went wrong. Please try again later.\";\n    root.append(errorPage);\n  });\n\n\n//# sourceURL=webpack://takehomeassignment/./src/index.mjs?");

/***/ }),

/***/ "./src/interactor/dataApi.mjs":
/*!************************************!*\
  !*** ./src/interactor/dataApi.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchHomePageData: () => (/* binding */ fetchHomePageData),\n/* harmony export */   getRefIdSetItems: () => (/* binding */ getRefIdSetItems)\n/* harmony export */ });\nconst DATA_API = {\n  baseUrl: \"https://cd-static.bamgrid.com/dp-117731241344\",\n};\n\nasync function fetchHomePageData() {\n  return fetch(`${DATA_API.baseUrl}/home.json`).then((res) => res.json());\n}\n\nasync function getRefIdSetItems(refId) {\n  return fetch(`${DATA_API.baseUrl}/sets/${refId}.json`)\n    .then((res) => res.json())\n    .then((body) => {\n      const { data } = body;\n      const items =\n        data.CuratedSet?.items ??\n        data.PersonalizedCuratedSet?.items ??\n        data.TrendingSet?.items;\n\n      if (!items ?? items.length === 0) {\n        const errorMessage = `No items found for refId: ${refId}`;\n        console.log(errorMessage);\n        throw new Error(errorMessage);\n      }\n\n      return items;\n    });\n}\n\n\n//# sourceURL=webpack://takehomeassignment/./src/interactor/dataApi.mjs?");

/***/ }),

/***/ "./src/utils.mjs":
/*!***********************!*\
  !*** ./src/utils.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTiles: () => (/* binding */ createTiles),\n/* harmony export */   generateUI: () => (/* binding */ generateUI),\n/* harmony export */   getHomePageSets: () => (/* binding */ getHomePageSets),\n/* harmony export */   lazyLoadCallback: () => (/* binding */ lazyLoadCallback),\n/* harmony export */   populateContentGrid: () => (/* binding */ populateContentGrid),\n/* harmony export */   registerNavEventListener: () => (/* binding */ registerNavEventListener),\n/* harmony export */   rowContent: () => (/* binding */ rowContent),\n/* harmony export */   setFocusOnFirstTile: () => (/* binding */ setFocusOnFirstTile),\n/* harmony export */   setRefSetLazyLoadObserver: () => (/* binding */ setRefSetLazyLoadObserver)\n/* harmony export */ });\n/* harmony import */ var _interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interactor/dataApi.mjs */ \"./src/interactor/dataApi.mjs\");\n/* harmony import */ var _assets_default_tile_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/default_tile.png */ \"./src/assets/default_tile.png\");\n\n\n\n\nfunction getHomePageSets(body) {\n  const {\n    data: { StandardCollection },\n  } = body;\n\n  if (!StandardCollection) throw Error(\"No StandardCollection found\");\n\n  const { containers } = StandardCollection;\n\n  if (!containers || containers.length === 0)\n    throw Error(\"No containers found for homepage sets\");\n\n  return containers.map((container) => {\n    let { set } = container;\n\n    if (!set) throw Error(\"No set found for homepage sets\");\n\n    const { items = [], text, refId } = set;\n\n    if (!items.length === 0) throw Error(\"No items found for homepage sets\");\n\n    return {\n      title: text?.title?.full?.set?.default?.content ?? \"\",\n      rowContent: items.map(rowContent),\n      refId,\n    };\n  });\n}\n\nfunction rowContent(item) {\n  const { image = {}, text = {}, ratings = [], collectionId = \"\" } = item;\n  const title =\n    text?.title?.full?.series?.default?.content ??\n    text?.title?.full?.program?.default?.content ??\n    text?.title?.full?.default?.default?.content ??\n    text?.title?.full?.collection?.default?.content;\n\n  return {\n    collectionId,\n    tileContent: {\n      imgSrc:\n        image?.tile?.[\"1.78\"]?.series?.default?.url ??\n        image?.tile?.[\"1.78\"]?.program?.default?.url ??\n        image?.tile?.[\"1.78\"]?.default?.default?.url,\n      title,\n    },\n    modalContent: {\n      imgSrc:\n        image?.background?.[\"1.78\"]?.series?.default?.url ??\n        image?.background?.[\"1.78\"]?.program?.default?.url ??\n        image?.background?.[\"1.78\"]?.default?.default?.url,\n      title,\n      ratings,\n      // can add more content here\n    },\n  };\n}\n\nfunction createTiles(rowContent, parentElement) {\n  rowContent.forEach((content) => {\n    const { collectionId, tileContent, modalContent } = content;\n    const tile = document.createElement(\"button\");\n    tile.className = \"tile\";\n\n    const img = document.createElement(\"img\");\n    img.src = tileContent.imgSrc;\n\n    tile.append(img);\n    // handle image loading error\n    img.onerror = function () {\n      img.src = _assets_default_tile_png__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n      const div = document.createElement(\"div\");\n      div.className = \"default-image-container\";\n\n      const title = document.createElement(\"h1\");\n      title.innerText = tileContent.title;\n      title.className = \"default-image-text\";\n\n      div.append(title, img);\n      tile.replaceChildren(div);\n    };\n\n    tile.onclick = function () {\n      if (collectionId) {\n        console.log(\"Navigate to collection page\", collectionId);\n        return;\n      }\n\n      if (document.getElementById(\"modal\")) return;\n\n      // create modal and overlay\n      const modal = document.createElement(\"div\");\n      modal.id = \"modal\";\n\n      const img = document.createElement(\"img\");\n      img.className = \"modal-img\";\n      img.src = modalContent.imgSrc;\n\n      img.onerror = function () {\n        img.src = _assets_default_tile_png__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n      };\n      const hasContentFailedToLoad =\n        modalContent.ratings.length === 0 || !modalContent.title;\n\n      if (hasContentFailedToLoad) {\n        console.log(\"Modal content failed to load\", modalContent);\n        const errorModal = document.createElement(\"div\");\n        errorModal.className = \"error-modal\";\n        errorModal.innerText =\n          \"Oops! Something went wrong. Please try again later.\";\n        modal.append(errorModal, img);\n      } else {\n        const contentDiv = document.createElement(\"div\");\n        contentDiv.className = \"modal-div\";\n        // create text to show\n        const h1 = document.createElement(\"h1\");\n        h1.innerText = modalContent.title;\n\n        const ratingsTitle = document.createElement(\"h3\");\n        ratingsTitle.innerText = \"Ratings\";\n\n        const ratings = document.createElement(\"p\");\n        ratings.innerText = modalContent.ratings.map(\n          (rating) => `${rating.system} ${rating.value}`\n        );\n\n        contentDiv.append(h1, ratingsTitle, ratings);\n        modal.append(contentDiv, img);\n      }\n      const overlay = document.createElement(\"div\");\n      overlay.className = \"overlay\";\n      document.body.append(modal, overlay);\n    };\n    parentElement.append(tile);\n  });\n}\n\nfunction generateUI(containerDetails) {\n  const root = document.getElementById(\"root\");\n\n  containerDetails.forEach(({ title, rowContent, refId }) => {\n    // create container title element\n    const rowTitle = document.createElement(\"div\");\n    rowTitle.classList.add(\"container-title\");\n    rowTitle.innerText = title;\n\n    if (refId) rowTitle.id = refId;\n\n    // create content row element\n    const contentRow = document.createElement(\"div\");\n    contentRow.className = \"content-row\";\n\n    createTiles(rowContent, contentRow);\n    root.append(rowTitle, contentRow);\n  });\n\n  return containerDetails.filter((row) => row.refId);\n}\n\nlet x = 0;\nlet y = 0;\nfunction registerNavEventListener(contentGrid) {\n  // navigation and tile interaction\n  document.addEventListener(\"keydown\", (e) => {\n    const focused = document.querySelector(\".focused\");\n    if (!focused) return;\n\n    switch (e.key) {\n      case \"ArrowRight\":\n        if (x === contentGrid[y].length - 1) return;\n        x += 1;\n        contentGrid[y][x]?.classList.add(\"focused\");\n        contentGrid[y][x]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n        break;\n      case \"ArrowLeft\":\n        if (x === 0) return;\n        x -= 1;\n        contentGrid[y][x]?.classList.add(\"focused\");\n        contentGrid[y][x]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n\n        break;\n      case \"ArrowDown\":\n        // when rows are loaded dynamically, we need to update the contentGrid\n        contentGrid = populateContentGrid();\n        if (y === contentGrid.length - 1) return;\n        y += 1;\n        contentGrid[y][x]?.classList.add(\"focused\");\n        contentGrid[y][x]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n        break;\n      case \"ArrowUp\":\n        if (y === 0) return;\n        y -= 1;\n        contentGrid[y][x]?.classList.add(\"focused\");\n        contentGrid[y][x]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n        break;\n      case \"Enter\":\n        focused.dispatchEvent(new Event(\"click\"));\n        break;\n      case \"Escape\":\n        const modal = document.getElementById(\"modal\");\n        const overlay = document.querySelector(\".overlay\");\n        if (modal) {\n          modal.remove();\n          overlay.remove();\n        }\n        break;\n    }\n  });\n}\n\nconst setRefSetLazyLoadObserver = (refSetData) => {\n  const LAZY_LOAD_DELAY = 5;\n  // lazy load the \"ref\" sets\n  setTimeout(() => {\n    let observer = new IntersectionObserver(lazyLoadCallback, {\n      rootMargin: \"100px\",\n    });\n    refSetData.forEach((row) => {\n      let target = document.getElementById(row.refId);\n      observer.observe(target);\n    });\n  }, LAZY_LOAD_DELAY);\n};\n\nconst lazyLoadCallback = (entries, observer) => {\n  entries.forEach((entry) => {\n    if (entry.isIntersecting) {\n      const row = document.getElementById(entry.target.id);\n      const contentRow = document.createElement(\"div\");\n      contentRow.className = \"content-row\";\n\n      // make api call and append to the row\n      (0,_interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__.getRefIdSetItems)(entry.target.id)\n        .then((items) => {\n          createTiles(items.map(rowContent), contentRow);\n        })\n        .then(() => {\n          row.nextSibling.replaceWith(contentRow);\n        })\n        .catch((err) => {\n          // remove the row if there is an error\n          // add monitoring so that we are alerted when this happens\n          console.log(`Error fetching data for ${entry.target.id}`, err);\n          row.remove();\n        })\n        .then(() => {\n          observer.unobserve(entry.target);\n        });\n    }\n  });\n};\n\nconst setFocusOnFirstTile = (tileBoard) => {\n  if (tileBoard.length > 0) tileBoard[0][0]?.classList.add(\"focused\");\n  return tileBoard;\n};\n\nconst populateContentGrid = () => {\n  const contentRows = document.querySelectorAll(\".content-row\");\n  return Array.from(contentRows)\n    .map((row) => {\n      return row.children;\n    })\n    .filter((row) => row.length > 0);\n};\n\n\n//# sourceURL=webpack://takehomeassignment/./src/utils.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.mjs");
/******/ 	
/******/ })()
;