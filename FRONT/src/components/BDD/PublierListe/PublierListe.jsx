import React, { useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { userColumns } from "./columns";
import { useTableSearch } from "./useTableSearch";

const { Search } = Input;

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:3000/product/products");
  return { data };
};

export default function Publier() {
  const [searchProduct, setSearchProduct] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchProduct,
    retrieve: fetchProducts,
  });

  return (
    <>
      <div className="publier">
        <h1>Publier une nouvelle offre de dons:</h1>
        <Search
          onChange={(e) => setSearchProduct(e.target.value)}
          placeholder="Chercher un produit"
          color="white"
          enterButton
        />
        <br /> <br />
        <Table
          rowKey="name"
          dataSource={filteredData}
          columns={userColumns}
          loading={loading}
          pagination={true}
        />
      </div>
    </>
  );
}
