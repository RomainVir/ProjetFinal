import React, { useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { userColumns } from "./columns";
import { useTableSearch } from "./useTableSearch";

const { Search } = Input;

const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/product/products"
  );
  return { data };
};

export default function TestTable() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers,
  });

  return (
    <>
      <Search
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search"
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
