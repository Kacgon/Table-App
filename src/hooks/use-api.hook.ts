import { useEffect, useState } from "react";
import { instance } from "../api";
import { Product } from "../type/product";

const useApiHook = (url: string) => {
  const [data, setData] = useState<Product[] | null>();
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    instance.get(url).then((response) => {
      setData(response.data.products);
      setTotalProducts(response.data.total);
    });
  }, [url]);

  return { data, totalProducts };
};

export default useApiHook;
