import { useState, useEffect } from "react";

export const useTableSearch = ({ searchProduct, retrieve }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  //chercher values plus loading
  useEffect(() => {
    setLoading(true);
    const find = (product, allValues) => {
      if (!allValues) allValues = [];
      for (var key in product) {
        if (typeof product[key] === "object") find(product[key], allValues);
        else allValues.push(product[key] + " ");
      }
      return allValues;
    };

    //trouver les infos
    const fetchData = async () => {
      const { data: products } = await retrieve();
      setOrigData(products);
      setFilteredData(products);
      const searchInd = products.map((product) => {
        const allValues = find(product);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (products) setLoading(false);
    };
    fetchData();
  }, [retrieve]);

  useEffect(() => {
    if (searchProduct) {
      const reqData = searchIndex.map((product, index) => {
        if (
          product.allValues
            .toLowerCase()
            .indexOf(searchProduct.toLowerCase()) >= 0
        )
          return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter((product) => {
          if (product) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchProduct, origData, searchIndex]);

  return { filteredData, loading };
};
