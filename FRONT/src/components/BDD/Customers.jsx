// Customers.js
import React from "react";
import Customer from "./Customer";

export default function Customers({ customers }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Référence</th>
          <th>Description</th>
          <th>Quantité</th>
        </tr>
      </thead>
      <tbody>
        {/* iterate through the customers array and render a unique Customer component for each customer object in the array */}
        {customers.map((customer) => (
          <Customer key={customer.id} customer={customer} />
        ))}
      </tbody>
    </table>
  );
}
