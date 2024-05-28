import { getRefIdSetItems } from "./interactor/dataApi.mjs";

import defaultImage from "./assets/default_tile.png";

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
      title: text?.title?.full?.set?.default?.content ?? "",
      rowContent: items.map(rowContent),
      refId,
    };
  });
}

export function rowContent(item) {
  const { image = {}, text = {}, ratings = [] } = item;
  const title =
    text?.title?.full?.series?.default?.content ??
    text?.title?.full?.program?.default?.content ??
    text?.title?.full?.default?.default?.content ??
    text?.title?.full?.collection?.default?.content;

  return {
    tileContent: {
      imgSrc:
        image?.tile?.["1.78"]?.series?.default?.url ??
        image?.tile?.["1.78"]?.program?.default?.url ??
        image?.tile?.["1.78"]?.default?.default?.url,
      title,
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
}

export function createTiles(rowContent, parentElement) {
  rowContent.forEach((content) => {
    const { tileContent, modalContent } = content;
    const tile = document.createElement("button");
    tile.className = "tile";

    const img = document.createElement("img");
    img.src = tileContent.imgSrc;

    tile.append(img);
    // handle image loading error
    img.onerror = function () {
      img.src = defaultImage;

      const div = document.createElement("div");
      div.className = "default-image-container";

      const title = document.createElement("h1");
      title.innerText = tileContent.title;
      title.className = "default-image-text";

      div.append(title, img);
      tile.replaceChildren(div);
    };

    tile.onclick = function () {
      if (document.getElementById("modal")) return;

      // create modal and overlay
      const modal = document.createElement("div");
      modal.id = "modal";

      const img = document.createElement("img");
      img.className = "modal-img";
      img.src = modalContent.imgSrc;

      img.onerror = function () {
        img.src = defaultImage;
      };
      const hasContentFailedToLoad =
        modalContent.ratings.length === 0 || !modalContent.title;

      if (hasContentFailedToLoad) {
        console.log("Modal content failed to load");
        const errorModal = document.createElement("div");
        errorModal.className = "error-modal";
        errorModal.innerText =
          "Oops! Something went wrong. Please try again later.";
        modal.append(errorModal, img);
      } else {
        const contentDiv = document.createElement("div");
        contentDiv.className = "modal-div";
        // create text to show
        const h1 = document.createElement("h1");
        h1.innerText = modalContent.title;

        const ratingsTitle = document.createElement("h3");
        ratingsTitle.innerText = "Ratings";

        const ratings = document.createElement("p");
        ratings.innerText = modalContent.ratings.map(
          (rating) => `${rating.system} ${rating.value}`
        );

        contentDiv.append(h1, ratingsTitle, ratings);
        modal.append(contentDiv, img);
      }
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      document.body.append(modal, overlay);
    };
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

export function registerNavEventListener() {
  // navigation and tile interaction
  document.addEventListener("keydown", (e) => {
    const focused = document.querySelector(".focused");

    if (!focused) return;

    const tiles = document.querySelectorAll(".tile");
    let index = Array.from(tiles).indexOf(focused);
    let nextTileIndex;

    switch (e.key) {
      case "ArrowRight":
        if (index === tiles.length - 1) return;

        tiles[index + 1]?.classList.add("focused");
        tiles[index + 1]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");
        break;
      case "ArrowLeft":
        if (index === 0) return;

        tiles[index - 1]?.classList.add("focused");
        tiles[index - 1]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");

        break;
      case "ArrowDown":
        nextTileIndex = focused.parentElement.children.length;
        if (index + nextTileIndex >= tiles.length) return;

        tiles[index + nextTileIndex]?.classList.add("focused");
        tiles[index + nextTileIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");
        break;
      case "ArrowUp":
        nextTileIndex = focused.parentElement.children.length;
        if (index - nextTileIndex < 0) return;
        tiles[index - nextTileIndex]?.classList.add("focused");
        tiles[index - nextTileIndex]?.scrollIntoView({
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

export const lazyLoadCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const row = document.getElementById(entry.target.id);
      const contentRow = document.createElement("div");
      contentRow.className = "content-row";

      // make api call and append to the row
      getRefIdSetItems(entry.target.id)
        .then((items) => {
          createTiles(items.map(rowContent), contentRow);
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
