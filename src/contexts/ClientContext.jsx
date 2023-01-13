import { createContext, useContext,useEffect,useState } from "react";
import {getClientList,insertClient,updateClient}from '../services/clietService'

const ClientContext = createContext();

const useClient = () => { 
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error(`useClient must be used within a ClientProvider`);
      }
      return context;
 }

const  ClientProvider = (props) => {
    const [clientList, setClientList] = useState([]);
  
    const createClient = (client) => {
      //logic to create a client
    }
    const getClientList = async () => {
      const obj = await getClientList();
      if (!obj.error) {
        setClientList(obj);
      }else{
        console.log(obj)
      }
    }
    const updateClient = async (id, object) => {
      const obj = await updateClient(id, object);
      if (!obj.error) {
        getClientList();
      }else{
        console.log(obj)
      }

    }
  
    return (
      <ClientContext.Provider value={{clientList, createClient, getClientList, updateClient}}>
        {props.children}
      </ClientContext.Provider>
    );
  }
  
  function useClient() {
    const context = React.useContext(ClientContext);
    if (!context) {
      throw new Error(`useClient must be used within a ClientProvider`);
    }
    return context;
  }
  
  export {ClientProvider, useClient};
 
  
 
  
  
  
  