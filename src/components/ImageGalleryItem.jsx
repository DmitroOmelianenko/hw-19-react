import React from "react";

function ImageGalleryItem({ url, large, onClick }) {
  return (
    <li className="gallery-item" onClick={() => onClick(large)}>
      <img src={url} alt="" />
    </li>
  );
}

export default ImageGalleryItem;
