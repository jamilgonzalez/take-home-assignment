import { getRefIdSets } from "./interactor/dataApi.mjs";

import url from "./assets/default_tile.png";

export function getHomePageSets(body) {
  const {
    data: {
      StandardCollection: { containers },
    },
  } = body;

  return containers.map((container) => {
    let {
      set: { items = [], text, refId },
    } = container;

    return {
      title: text.title.full.set.default.content,
      rowContent: items.map(imageSrc),
      refId,
    };
  });
}

export function getRefSets(rowData) {
  return Promise.all(
    rowData.map((row) => {
      if (row.refId) {
        return getRefIdSets(row.refId).then((items) => {
          return {
            ...row,
            rowContent: items.map(imageSrc),
          };
        });
      }
      return row;
    })
  );
}

// todo: change
export function imageSrc(item) {
  const {
    image,
    text: {
      title: { full },
    },
    ratings,
  } = item;

  return {
    imgSrc:
      image.tile["1.78"].series?.default.url ??
      image.tile["1.78"].program?.default.url ??
      image.tile["1.78"].default?.default.url,
    modalContent: {
      imgSrc:
        image.background?.["1.78"].series?.default.url ??
        image.background?.["1.78"].program?.default.url ??
        image.background?.["1.78"].default?.default.url,
      title:
        full?.series?.default.content ??
        full?.program?.default.content ??
        full?.default?.default.content,
      ratings: ratings,
      // add more content here
    },
  };
}

export function generateUI(containerDetails) {
  const root = document.getElementById("root");

  containerDetails.forEach(({ title, rowContent, refId }, i) => {
    // create container title element
    const rowTitle = document.createElement("div");
    rowTitle.className = "container-title";
    rowTitle.innerText = title;

    // create content row element
    const contentRow = document.createElement("div");
    contentRow.className = "content-row";

    // create tiles
    rowContent.forEach((content, j) => {
      const { imgSrc, modalContent } = content;
      // create image tile
      const img = document.createElement("img");

      img.src = imgSrc;

      // configure tile
      const tile = document.createElement("button");
      // give it styling
      tile.className = "tile";
      // set the onclick event
      tile.onclick = function () {
        if (document.getElementById("modal")) return;

        // create modal and overlay
        const modal = document.createElement("div");
        modal.id = "modal";

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        // create text to show
        const h1 = document.createElement("h1");
        h1.innerText = modalContent.title;

        const ratingsTitle = document.createElement("h3");
        ratingsTitle.innerText = "Ratings";

        const ratings = document.createElement("p");
        ratings.innerText = modalContent.ratings.map(
          (rating) => `${rating.system} ${rating.value}`
        );

        modal.appendChild(h1);
        modal.appendChild(ratingsTitle);
        modal.appendChild(ratings);

        document.body.appendChild(modal);
        document.body.appendChild(overlay);
      };

      img.onerror = function () {
        img.src = url;

        const div = document.createElement("div");
        div.className = "default-image-container";

        const title = document.createElement("h1");
        title.innerText = modalContent.title;
        title.className = "default-image-text";

        div.appendChild(title);
        div.appendChild(img);
        tile.appendChild(div);
      };

      tile.appendChild(img);
      contentRow.appendChild(tile);

      // todo: do this somewhere else
      if (i === 0 && j === 0) {
        tile.classList.add("focused");
      }
    });

    root.appendChild(rowTitle);
    root.appendChild(contentRow);
  });
}

export function registerNavEventListener() {
  // navigation and tile interaction
  document.addEventListener("keydown", (e) => {
    const focused = document.querySelector(".focused");
    if (!focused) return;

    const tiles = document.querySelectorAll(".tile");
    let index = Array.from(tiles).indexOf(focused);

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
        if (index + 15 >= tiles.length) return;

        tiles[index + 15]?.classList.add("focused");
        tiles[index + 15]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        focused.classList.remove("focused");
        break;
      case "ArrowUp":
        if (index - 15 < 0) return;
        tiles[index - 15]?.classList.add("focused");
        tiles[index - 15]?.scrollIntoView({
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
