import React, { useReducer } from "react";

const initialState = { value: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { value: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Searchbar({ onSubmit }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.value.trim()) return;
    onSubmit(state.value);
    dispatch({ type: "RESET" });
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          value={state.value}
          onChange={(e) => dispatch({ type: "SET_VALUE", payload: e.target.value })}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
