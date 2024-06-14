import { itemsWithData } from "./filter.mjs";
import { setImageOnErrorHandler, setTileOnClickHandler } from "./handlers.mjs";
import { getRefIdSetItems } from "../interactor/dataApi.mjs";
import { transformToRowContent } from "./transform.mjs";

export function getHomePageSets(body) {
  const {
    data: { StandardCollection },
  } = body;

  if (!StandardCollection) throw Error("No StandardCollection found");

  const { containers } = StandardCollection;

  if (!containers || containers.length === 0)
    throw Error("No containers found for homepage sets");

  return containers.map((container) => {
    let { set } = container;

    if (!set) throw Error("No set found for homepage sets");

    const { items = [], text, refId } = set;

    if (!items.length === 0) throw Error("No items found for homepage sets");

    return {
      title: text?.title?.full?.set?.default?.content ?? "", // if no title is found, we still want to display the content
      rowContent: items.filter(itemsWithData).map(transformToRowContent),
      refId,
    };
  });
}

function createTiles(rowContent, parentElement) {
  rowContent.forEach((content) => {
    const { collectionId, tileContent, modalContent } = content;
    const tile = document.createElement("button");
    tile.className = "tile";

    const img = document.createElement("img");
    img.src = tileContent.imgSrc;
    setImageOnErrorHandler(img, tile, tileContent.title);
    tile.append(img);

    setTileOnClickHandler(tile, modalContent, collectionId);
    parentElement.append(tile);
  });
}

export function generateUI(containerDetails) {
  const root = document.getElementById("root");

  containerDetails.forEach(({ title, rowContent, refId }) => {
    // create container title element
    const rowTitle = document.createElement("div");
    rowTitle.classList.add("container-title");
    rowTitle.innerText = title;

    if (refId) rowTitle.id = refId;

    // create content row element
    const contentRow = document.createElement("div");
    contentRow.className = "content-row";

    createTiles(rowContent, contentRow);
    root.append(rowTitle, contentRow);
  });

  return containerDetails.filter((row) => row.refId);
}

export const setRefSetLazyLoadObserver = (refSetData) => {
  const LAZY_LOAD_DELAY = 5;
  // lazy load the "ref" sets
  setTimeout(() => {
    let observer = new IntersectionObserver(lazyLoadCallback, {
      rootMargin: "100px",
    });
    refSetData.forEach((row) => {
      let target = document.getElementById(row.refId);
      observer.observe(target);
    });
  }, LAZY_LOAD_DELAY);
};

const lazyLoadCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const row = document.getElementById(entry.target.id);
      const contentRow = document.createElement("div");
      contentRow.className = "content-row";

      // make api call and append to the row
      getRefIdSetItems(entry.target.id)
        .then((items) => {
          createTiles(items.map(transformToRowContent), contentRow);
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
};

export const populateContentGrid = () => {
  const contentRows = document.querySelectorAll(".content-row");
  return Array.from(contentRows)
    .map((row) => {
      return row.children;
    })
    .filter((row) => row.length > 0);
};

export const setFocusOnFirstTile = (tileBoard) => {
  if (tileBoard.length > 0) tileBoard[0][0]?.classList.add("focused");
  return tileBoard;
};

let x = 0;
let y = 0;
export function registerNavEventListener(contentGrid) {
  // navigation and tile interaction
  document.addEventListener("keydown", (e) => {
    const focused = document.querySelector(".focused");
    if (!focused) return;

    switch (e.key) {
      case "ArrowRight":
        if (x === contentGrid[y].length - 1) return;
        x += 1;
        contentGrid[y][x]?.classList.add("focused");
        contentGrid[y][x]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");
        break;
      case "ArrowLeft":
        if (x === 0) return;
        x -= 1;
        contentGrid[y][x]?.classList.add("focused");
        contentGrid[y][x]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");

        break;
      case "ArrowDown":
        // when rows are loaded dynamically, we need to update the contentGrid
        contentGrid = populateContentGrid();
        if (y === contentGrid.length - 1) return;
        y += 1;
        contentGrid[y][x]?.classList.add("focused");
        contentGrid[y][x]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");
        break;
      case "ArrowUp":
        if (y === 0) return;
        y -= 1;
        contentGrid[y][x]?.classList.add("focused");
        contentGrid[y][x]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");
        break;
      case "Enter":
        focused.dispatchEvent(new Event("click"));
        break;
      case "Escape":
        const modal = document.getElementById("modal");
        const overlay = document.querySelector(".overlay");
        if (modal) {
          modal.remove();
          overlay.remove();
        }
        break;
    }
  });
}
