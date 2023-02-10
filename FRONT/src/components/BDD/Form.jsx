import { useState } from "react";

export default function Form({ onSubmit }) {
  const [newProduct, setNewProduct] = useState("");

  console.log(onSubmit);  
  function handleInput(e) {
    setNewProduct(e.target.value);
  }
  return (
    <form
      onSubmit={(e) => onSubmit(e, newProduct)}
      className="form-group container"
    >
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Add a new product"
        value={newProduct}
        onChange={handleInput}
      />
    </form>
  );
}
