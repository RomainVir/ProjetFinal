import { useState } from "react";

const initialList = {
  reference: "",
  description: "",
  quantity: "",
  photo: "",
};
export default function PublierListe() {
  const [newList, setnewList] = useState(initialList);

  function handleInput(event) {
    const newListToPublish = {
      ...newList,
      [event.target.name]: event.target.value,
    };

    setnewList(newListToPublish);
  }
  console.log(newList);
  async function ShowProductList(e) {
    e.preventDefault();
    console.log(newList);
    fetch("http://localhost:3000/product/add_product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 401) {
        throw "Non autorisé";
      } else if (response.status === 200) {
        alert(
          `Produit ${newList.reference} bien enregistré dans la base de données`
        );
        setNewUser(initialList);
      } else if (response.status === 409) {
        alert(`Produit déjà présent dans la base de données`);
      }
    });
  }
  return (
    <div>
      <form onSubmit={ShowProductList}>
        <input
          type="text"
          name="reference"
          placeholder="Référence"
          value={newList.reference}
          onChange={handleInput}
        />
        <input
          type="text"
          name="description"
          required
          placeholder="Description"
          value={newList.description}
          onChange={handleInput}
        />
        <input
          type="text"
          name="quantity"
          required
          placeholder="Quantité"
          value={newList.quantity}
          onChange={handleInput}
        />
        <input
          type="text"
          name="photo"
          required
          placeholder="Photo"
          value={newList.photo}
          onChange={handleInput}
        />
        <button type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
}
