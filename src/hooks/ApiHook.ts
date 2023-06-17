import { useEffect, useState } from "react";
import { instance } from "../enum/api";
import { Item } from "../models/item";

const useApiHook = (url: string) => {
  const [data, setData] = useState<Item[] | null>();
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
