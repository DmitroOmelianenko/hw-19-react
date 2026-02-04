import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";

const API_KEY = "53820652-6964ef6fc2797102960f5b7d7";

const initialState = {
  query: "",
  images: [],
  page: 1,
  loading: false,
  showModal: false,
  largeImage: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, page: 1, images: [] };
    case "SET_IMAGES":
      return {
        ...state,
        images:
          state.page === 1 ? action.payload : [...state.images, ...action.payload]
      };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "OPEN_MODAL":
      return { ...state, showModal: true, largeImage: action.payload };
    case "CLOSE_MODAL":
      return { ...state, showModal: false, largeImage: "" };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.query) return;
    dispatch({ type: "SET_LOADING", payload: true });
    fetch(
      `https://pixabay.com/api/?q=${state.query}&page=${state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_IMAGES", payload: data.hits });
      })
      .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
  }, [state.query, state.page]);

  const handleSearch = useCallback((newQuery) => {
    dispatch({ type: "SET_QUERY", payload: newQuery });
  }, []);

  const memoizedImages = useMemo(() => state.images, [state.images]);

  const openModal = useCallback((url) => {
    dispatch({ type: "OPEN_MODAL", payload: url });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={memoizedImages} onImageClick={openModal} />
      {state.loading && <Loader />}
      {state.images.length > 0 && !state.loading && (
        <Button onClick={() => dispatch({ type: "NEXT_PAGE" })} />
      )}
      {state.showModal && <Modal url={state.largeImage} onClose={closeModal} />}
    </div>
  );
}

export default App;
