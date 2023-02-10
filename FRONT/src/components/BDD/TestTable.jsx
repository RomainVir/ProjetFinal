import React, { useEffect, useState } from "react";
import Customers from "./Customers";

function Test() {
  // set state
  const [customers, setCustomers] = useState([]);

  // first data grab
  useEffect(() => {
    fetch("http://localhost:3000/product/products") // your url may look different
      .then((resp) => resp.json())
      .then((data) => setCustomers(data)); // set data to state
  }, []);

  return (
    <div>
      {/* pass data down to the Customers component where we'll create the table*/}
      <Customers customers={customers} />
    </div>
  );
}
export default Test;
