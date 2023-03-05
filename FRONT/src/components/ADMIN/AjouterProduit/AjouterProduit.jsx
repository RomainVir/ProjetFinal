import { useState } from "react";
import Swal from "sweetalert2";

const initialProductState = {
  reference: "",
  description: "",
};
export default function AjouterProduit() {
  const [newProduct, setNewProduct] = useState(initialProductState);

  //hop
  function handleInput(event) {
    const newProductPublished = {
      ...newProduct,
      [event.target.name]: event.target.value,
    };

    setNewProduct(newProductPublished);
  }
  console.log(newProduct);
  async function ProductPublished(e) {
    e.preventDefault();
    fetch("http://localhost:3000/product/add_product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 401) {
        throw "Non autorisé";
      } else if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Prodducto ${newProduct.reference} registrado`,
          showConfirmButton: false,
          timer: 4500,
        });
        setNewUser(initialProductState);
      } else if (response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Producto ya existe`,
          showConfirmButton: false,
          timer: 4500,
        });
      }
    });
  }
  return (
    <div>
      <form className="formModifier" onSubmit={ProductPublished}>
        <h1>Añadir un producto:</h1>
        <div className="inputModifier">
          <input
            required
            type="text"
            name="reference"
            placeholder="Referencia"
            value={newProduct.reference}
            onChange={handleInput}
          />
          <input
            required
            type="text"
            name="description"
            placeholder="Descricpción"
            value={newProduct.description}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
}
