import { useState, useEffect, useCallback } from "react";
import ClientDetailModal from "../componets/cliente/ClientDetailModal";
import FormClient from "../componets/cliente/FormClient";
import { useClient } from "../contexts/ClientContext";   
import {replaceNullWithUndefined} from "../misc/misc"
function ClientList() {
  //properties provider
  const { clientList,getClientListC,updateClientC,setClientL } = useClient()
  //useStates
  const [toggleAdd, setToggleAdd] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  

  //handles
  const handleToggleAdd = () => {
    if (toggleAdd) {
      setToggleAdd(false);
    } else {
      setToggleAdd(true);
    }
  };
  const handleDetail = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleGetClietList = useCallback(async () => {
    await getClientListC();
  },[getClientListC]);
  const handleSearch = () => {
    const searchValue = document.getElementById("search").value;
    const filteredClients = clientList.filter((client) =>
      client.Name.includes(searchValue)
    );
    setClientL(filteredClients);
  };
  const handleInputChange = (event) => {
    if (event.target.value === "") {
      handleGetClietList();
    } else {
      handleSearch();
    }
  };
  const handleUpdate = async(id,object) => { 
    await updateClientC(id,object);
}

//useEffects
  useEffect(() => {   
    handleGetClietList();
    console.log('Clientlist')
  },[handleGetClietList]);
  if(!clientList)return <p>Loading...</p>
  return (
    <>
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          id="search"
          placeholder="Search by name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Codigo Cliente</th>
            <th>Nombre Cliente</th>
            <th>Status</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientList.map((element) => (
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.Name}</td>
              <td>{element.active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                onClick={()=>{ 
                    replaceNullWithUndefined(element);                
                    handleDetail(element); 
                    console.log(selectedClient,showModal) ;                  
                }}
                >Detalles</button>                
                <button onClick={()=>{handleUpdate(element.id, {active: !element.active})}}>{element.active ? "Inactivar" : "Activar"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {toggleAdd && (
          <FormClient
            toggle={() => {
              setToggleAdd(false);
            }}
            updateList={handleGetClietList}
          />
         
        )}
        {
           (showModal && <ClientDetailModal client={selectedClient} onClose={handleCloseModal} updateList={handleGetClietList}/>) 
        }
      </div>
      <div>
        {!toggleAdd && <button onClick={handleToggleAdd}>new Client</button>}        
      </div>
    </>
  );
}

export default ClientList;
