import { useState } from "react";

const initialProductState = {
  reference: "",
  description: "",
  quantity: "",
  photo: "",
};
export default function AjouterProduit() {
  const [newProduct, setNewProduct] = useState(initialProductState);

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
    console.log(newProduct);
    fetch("http://localhost:3000/product/add_product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 401) {
        throw "Non autorisé";
      } else if (response.status === 200) {
        alert(
          `Produit ${newProduct.reference} bien enregistré dans la base de données`
        );
        setNewUser(initialProductState);
      } else if (response.status === 409) {
        alert(`Produit déjà présent dans la base de données`);
      }
    });
  }
  return (
    <div>
      <h1>Ajouter un nouveau produit dans la base de données:</h1>
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
          name="photo"
          required
          placeholder="Photo"
          value={newProduct.photo}
          onChange={handleInput}
        />
        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
}
