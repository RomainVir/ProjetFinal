import { useEffect, useState } from "react";

export default function PublierListe() {
  const [products, setProducts] = useState([]);

  useEffect(
    function () {
      async function fetchProducts() {
        const response = await fetch("http://localhost:3000/product/products");
        const data = await response.json();
        setProducts(data);
      }
      fetchProducts();
    },
    [products]
  );

  return (
    <>
      <table>
        <tr>
          <th>Réference</th>
          <th>Description</th>
          <th>Quantité</th>
        </tr>
        {products.map((item) => (
          <tr key={item}>
            <td>{item.reference}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
