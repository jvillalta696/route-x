import { createContext, useContext, useEffect, useState } from "react";
import {
  getClientList,
  insertClient,
  updateClient,
} from "../services/clietService";

const ClientContext = createContext();

const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(`useClient must be used within a ClientProvider`);
  }
  return context;
};

const ClientProvider = (props) => {
  const [clientList, setClientList] = useState([]);

  const createClient = async (client) => {
    const isOk = await insertClient(client);
    if (isOk) {
      await getClientListC();
    }
  };

  const getClientListC = async () => {
    const obj = await getClientList();
    if (!obj.error) {
      setClientList(obj);
    } else {
      console.log(obj);
    }
  };
  const updateClientC = async (id, object) => {
    const obj = await updateClient(id, object);
    if (!obj.error) {
      getClientList();
    } else {
      console.log(obj);
    }
  };

  return (
    <ClientContext.Provider
      value={{ clientList, createClient, getClientListC, updateClientC }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export { ClientProvider, useClient };
