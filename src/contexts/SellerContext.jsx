import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getSellerList,
  insertSeller,
  updateSeller,
} from "../services/sellerService";

const SellerContext = createContext();

const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error(`useSeller must be used within a ClientProvider`);
  }
  return context;
};

const SellerProvider = ({ children }) => {
  const [sellerList, setSellerList] = useState([]);

  const setSellerL = (data) => {
    setSellerList(data);
  };

  const findSellerById = ( id) => {
    return sellerList.find(seller => seller.id === id);
  }

  const createSeller = async (seller) => {
    const isOk = await insertSeller(seller);
    if (isOk) {
      await getSellerListC();
    }
    return isOk;
  };

  const getSellerListC = useCallback(async () => {
    const obj = await getSellerList();
    if (!obj.error) {
      setSellerList(obj);
    } else {
      console.log(obj);
    }
  }, []);
  const updateSellerC = async (id, object) => {
    const obj = await updateSeller(id, object);
    if (!obj.error) {
      await getSellerListC();
    } else {
      console.log(obj);
    }
  };
  useEffect(() => {
    getSellerListC();
  }, [getSellerListC]);
  return (
    <SellerContext.Provider
      value={{
        sellerList,
        createSeller,
        getSellerListC,
        updateSellerC,
        setSellerL,
        findSellerById,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export { SellerProvider, useSeller };
