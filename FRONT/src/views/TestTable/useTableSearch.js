import { useState, useEffect } from "react";

export const useTableSearch = ({ searchVal, retrieve }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (product, allValues) => {
      if (!allValues) allValues = [];
      for (var key in product) {
        if (typeof product[key] === "object") crawl(product[key], allValues);
        else allValues.push(product[key] + " ");
      }
      return allValues;
    };
    const fetchData = async () => {
      const { data: products } = await retrieve();
      setOrigData(products);
      setFilteredData(products);
      const searchInd = products.map(product => {
        const allValues = crawl(product);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (products) setLoading(false);
    };
    fetchData();
  }, [retrieve]);

  useEffect(() => {
    if (searchVal) {
      const reqData = searchIndex.map((product, index) => {
        if (product.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0)
          return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter(product => {
          if (product) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  return { filteredData, loading };
};
