import { useState } from "react";
import Swal from "sweetalert2";

const initialProductState = {
  reference: "",

};
export default function SupprimerProduit() {
  const [deleteProduct, setDeleteProduct] = useState(initialProductState);
  //ok
  function handleInput(event) {
    const newProductDeleted = {
      ...deleteProduct,
      [event.target.name]: event.target.value,
    };

    setDeleteProduct(newProductDeleted);
  }
  console.log(deleteProduct);
  async function ProductDeleted(e) {
    e.preventDefault();
    fetch("http://localhost:3000/product/delete_product/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteProduct),
    }).then((response) => {
      console.log(response.status);
      if (response.status === 401) {
        throw "Non autorisé";
      } else if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Produit ${deleteProduct.reference} bien enregistré dans la base de données`,
          showConfirmButton: false,
          timer: 4500,
        });
        setDeleteProduct(initialProductState);
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
    
      <form className="formModifier" onSubmit={ProductDeleted}>
      <h1>Borrar un producto:</h1>
      <div className="inputModifier"> 
        <input
          type="text"
          name="reference"
          placeholder="Referencia"
          value={deleteProduct.reference}
          onChange={handleInput}
        />
        
        </div>
        <button type="submit">Borrar</button>
      </form>
    </div>
  );
}
