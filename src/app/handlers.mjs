import defaultImage from "../assets/default_tile.png";

export function setImageOnErrorHandler(img, tile, contentTitle) {
  img.onerror = function () {
    img.src = defaultImage;

    const div = document.createElement("div");
    div.className = "default-image-container";

    const title = document.createElement("h1");
    title.innerText = contentTitle;
    title.className = "default-image-text";

    div.append(title, img);
    tile.replaceChildren(div);
  };
}

export function setTileOnClickHandler(tile, modalContent, collectionId) {
  tile.onclick = function () {
    if (collectionId) {
      console.log("Navigate to collection page", collectionId);
      return;
    }

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

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.append(modal, overlay);
  };
}
