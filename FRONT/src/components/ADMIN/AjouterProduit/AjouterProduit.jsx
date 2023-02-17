import { useState } from "react";
import Swal from "sweetalert2";

const initialProductState = {
  reference: "",
  description: "",
  quantity: "",
  quantityMax: "",
  photo: "",
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
          title: `Produit ${newProduct.reference} bien enregistré dans la base de données`,
          showConfirmButton: false,
          timer: 4500,
        });
        setNewUser(initialProductState);
      } else if (response.status === 409) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Produit déjà présent dans la base de données`,
          showConfirmButton: false,
          timer: 4500,
        });
      }
    });
  }
  return (
    <div>
      <h1>Ajouter un nouveau produit:</h1>
      <form className="formAjouter" onSubmit={ProductPublished}>
        <input
          type="text"
          name="reference"
          placeholder="Référence"
          value={newProduct.reference}
          onChange={handleInput}
        />
        <input
          type="text"
          name="description"
          required
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInput}
        />
        <input
          type="text"
          name="quantity"
          required
          placeholder="Quantité"
          value={newProduct.quantity}
          onChange={handleInput}
        />
        <input
          type="text"
          name="quantityMax"
          required
          placeholder="Quantité maximum"
          value={newProduct.quantityMax}
          onChange={handleInput}
        />
        <input
          type="text"
          name="photo"
          required
          placeholder="Photo"
          value={newProduct.photo}
          onChange={handleInput}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
