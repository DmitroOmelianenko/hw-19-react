import React, { useState, useEffect, useCallback, useMemo } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";

const API_KEY = "53820652-6964ef6fc2797102960f5b7d7"; 

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages((prev) => (page === 1 ? data.hits : [...prev, ...data.hits]));
      })
      .finally(() => setLoading(false));
  }, [query, page]);


  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
    setPage(1);
  }, []);


  const memoizedImages = useMemo(() => images, [images]);

  const openModal = useCallback((url) => {
    setLargeImage(url);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={memoizedImages} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={() => setPage((p) => p + 1)} />
      )}
      {showModal && <Modal url={largeImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
