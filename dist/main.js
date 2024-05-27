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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interactor/dataApi.mjs */ \"./src/interactor/dataApi.mjs\");\n/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ \"./src/utils.mjs\");\n\n\n\n(0,_interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__.fetchHomePageData)()\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.getHomePageSets)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.getRefSets)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.generateUI)\n  .then(_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.registerNavEventListener)\n  .catch((err) => {\n    console.error(err);\n    // render error message\n  });\n\n\n//# sourceURL=webpack://takehomeassignment/./src/index.mjs?");

/***/ }),

/***/ "./src/interactor/dataApi.mjs":
/*!************************************!*\
  !*** ./src/interactor/dataApi.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchHomePageData: () => (/* binding */ fetchHomePageData),\n/* harmony export */   getRefIdSets: () => (/* binding */ getRefIdSets)\n/* harmony export */ });\nconst DATA_API = {\n  baseUrl: \"https://cd-static.bamgrid.com/dp-117731241344\",\n};\n\nasync function fetchHomePageData() {\n  return fetch(`${DATA_API.baseUrl}/home.json`)\n    .then((res) => res.json())\n    .catch((err) => console.error(err));\n}\n\nasync function getRefIdSets(refId) {\n  return fetch(`${DATA_API.baseUrl}/sets/${refId}.json`)\n    .then((res) => res.json())\n    .then((body) => {\n      const { data } = body;\n      return (\n        data.CuratedSet?.items ??\n        data.PersonalizedCuratedSet?.items ??\n        data.TrendingSet?.items ??\n        []\n      );\n    });\n}\n\n\n//# sourceURL=webpack://takehomeassignment/./src/interactor/dataApi.mjs?");

/***/ }),

/***/ "./src/utils.mjs":
/*!***********************!*\
  !*** ./src/utils.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateUI: () => (/* binding */ generateUI),\n/* harmony export */   getHomePageSets: () => (/* binding */ getHomePageSets),\n/* harmony export */   getRefSets: () => (/* binding */ getRefSets),\n/* harmony export */   imageSrc: () => (/* binding */ imageSrc),\n/* harmony export */   registerNavEventListener: () => (/* binding */ registerNavEventListener)\n/* harmony export */ });\n/* harmony import */ var _interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interactor/dataApi.mjs */ \"./src/interactor/dataApi.mjs\");\n/* harmony import */ var _assets_default_tile_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/default_tile.png */ \"./src/assets/default_tile.png\");\n\n\n\n\nfunction getHomePageSets(body) {\n  const {\n    data: {\n      StandardCollection: { containers },\n    },\n  } = body;\n\n  return containers.map((container) => {\n    let {\n      set: { items = [], text, refId },\n    } = container;\n\n    return {\n      title: text.title.full.set.default.content,\n      rowContent: items.map(imageSrc),\n      refId,\n    };\n  });\n}\n\nfunction getRefSets(rowData) {\n  return Promise.all(\n    rowData.map((row) => {\n      if (row.refId) {\n        return (0,_interactor_dataApi_mjs__WEBPACK_IMPORTED_MODULE_0__.getRefIdSets)(row.refId).then((items) => {\n          return {\n            ...row,\n            rowContent: items.map(imageSrc),\n          };\n        });\n      }\n      return row;\n    })\n  );\n}\n\n// todo: change\nfunction imageSrc(item) {\n  const {\n    image,\n    text: {\n      title: { full },\n    },\n    ratings,\n  } = item;\n\n  return {\n    imgSrc:\n      image.tile[\"1.78\"].series?.default.url ??\n      image.tile[\"1.78\"].program?.default.url ??\n      image.tile[\"1.78\"].default?.default.url,\n    modalContent: {\n      imgSrc:\n        image.background?.[\"1.78\"].series?.default.url ??\n        image.background?.[\"1.78\"].program?.default.url ??\n        image.background?.[\"1.78\"].default?.default.url,\n      title:\n        full?.series?.default.content ??\n        full?.program?.default.content ??\n        full?.default?.default.content,\n      ratings: ratings,\n      // add more content here\n    },\n  };\n}\n\nfunction generateUI(containerDetails) {\n  const root = document.getElementById(\"root\");\n\n  containerDetails.forEach(({ title, rowContent, refId }, i) => {\n    // create container title element\n    const rowTitle = document.createElement(\"div\");\n    rowTitle.className = \"container-title\";\n    rowTitle.innerText = title;\n\n    // create content row element\n    const contentRow = document.createElement(\"div\");\n    contentRow.className = \"content-row\";\n\n    // create tiles\n    rowContent.forEach((content, j) => {\n      const { imgSrc, modalContent } = content;\n      // create image tile\n      const img = document.createElement(\"img\");\n\n      img.src = imgSrc;\n\n      // configure tile\n      const tile = document.createElement(\"button\");\n      // give it styling\n      tile.className = \"tile\";\n      // set the onclick event\n      tile.onclick = function () {\n        if (document.getElementById(\"modal\")) return;\n\n        // create modal and overlay\n        const modal = document.createElement(\"div\");\n        modal.id = \"modal\";\n\n        const overlay = document.createElement(\"div\");\n        overlay.className = \"overlay\";\n\n        // create text to show\n        const h1 = document.createElement(\"h1\");\n        h1.innerText = modalContent.title;\n\n        const ratingsTitle = document.createElement(\"h3\");\n        ratingsTitle.innerText = \"Ratings\";\n\n        const ratings = document.createElement(\"p\");\n        ratings.innerText = modalContent.ratings.map(\n          (rating) => `${rating.system} ${rating.value}`\n        );\n\n        modal.appendChild(h1);\n        modal.appendChild(ratingsTitle);\n        modal.appendChild(ratings);\n\n        document.body.appendChild(modal);\n        document.body.appendChild(overlay);\n      };\n\n      img.onerror = function () {\n        img.src = _assets_default_tile_png__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n        const div = document.createElement(\"div\");\n        div.className = \"default-image-container\";\n\n        const title = document.createElement(\"h1\");\n        title.innerText = modalContent.title;\n        title.className = \"default-image-text\";\n\n        div.appendChild(title);\n        div.appendChild(img);\n        tile.appendChild(div);\n      };\n\n      tile.appendChild(img);\n      contentRow.appendChild(tile);\n\n      // todo: do this somewhere else\n      if (i === 0 && j === 0) {\n        tile.classList.add(\"focused\");\n      }\n    });\n\n    root.appendChild(rowTitle);\n    root.appendChild(contentRow);\n  });\n}\n\nfunction registerNavEventListener() {\n  // navigation and tile interaction\n  document.addEventListener(\"keydown\", (e) => {\n    const focused = document.querySelector(\".focused\");\n    if (!focused) return;\n\n    const tiles = document.querySelectorAll(\".tile\");\n    let index = Array.from(tiles).indexOf(focused);\n\n    switch (e.key) {\n      case \"ArrowRight\":\n        if (index === tiles.length - 1) return;\n\n        tiles[index + 1]?.classList.add(\"focused\");\n        tiles[index + 1]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n        break;\n      case \"ArrowLeft\":\n        if (index === 0) return;\n\n        tiles[index - 1]?.classList.add(\"focused\");\n        tiles[index - 1]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n\n        break;\n      case \"ArrowDown\":\n        if (index + 15 >= tiles.length) return;\n\n        tiles[index + 15]?.classList.add(\"focused\");\n        tiles[index + 15]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n        break;\n      case \"ArrowUp\":\n        if (index - 15 < 0) return;\n        tiles[index - 15]?.classList.add(\"focused\");\n        tiles[index - 15]?.scrollIntoView({\n          behavior: \"smooth\",\n          block: \"center\",\n        });\n        focused.classList.remove(\"focused\");\n        break;\n      case \"Enter\":\n        focused.dispatchEvent(new Event(\"click\"));\n        break;\n      case \"Escape\":\n        const modal = document.getElementById(\"modal\");\n        const overlay = document.querySelector(\".overlay\");\n        if (modal) {\n          modal.remove();\n          overlay.remove();\n        }\n        break;\n    }\n  });\n}\n\n\n//# sourceURL=webpack://takehomeassignment/./src/utils.mjs?");

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