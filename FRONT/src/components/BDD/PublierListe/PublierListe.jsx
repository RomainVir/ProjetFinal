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
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchProducts,
  });

  return (
    <>
      <h1>Publier une nouvelle offre de dons:</h1>
      <Search
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Chercher un produit"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <br /> <br />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={userColumns}
        loading={loading}
        pagination={true}
      />
    </>
  );
}
