import { useState, useEffect } from "react";
import FormClient from "../componets/cliente/FormClient";
import { getClientList, updateClient } from "../services/clietService";

function ClientList() {
  //useStates
  const [toggleAdd, setToggleAdd] = useState(false);
  const [clientList, setClientList] = useState([]);

  //handles
  const handleToggleAdd = () => {
    if (toggleAdd) {
      setToggleAdd(false);
    } else {
      setToggleAdd(true);
    }
  };
  const handleGetClietList = async () => {
    const obj = await getClientList();
    if (obj.error) {
      console.log("ALERTA", obj);
    } else {
      setClientList(obj);
    }
    console.log(clientList);
  };
  const handleSearch = () => {
    const searchValue = document.getElementById("search").value;
    const filteredClients = clientList.filter((client) =>
      client.Name.includes(searchValue)
    );
    setClientList(filteredClients);
  };
  const handleInputChange = (event) => {
    if (event.target.value === "") {
      handleGetClietList();
    } else {
      handleSearch();
    }
  };
  const handleUpdate = async(id,object) => { 
    const obj = await updateClient(id, object); 
    if (obj.error) {
        console.log("ALERTA", obj);
      } else {
        handleGetClietList();
      }
      console.log(clientList);
}

//useEffects
  useEffect(() => {
    handleGetClietList();
  }, [toggleAdd]);
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
                <button>Detalles</button>
                <button>Actualizar</button>
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
      </div>
      <div>
        {!toggleAdd && <button onClick={handleToggleAdd}>new Client</button>}
        <button onClick={handleGetClietList}>Actualizar datos</button>
        <button
          onClick={() => {
            console.log(clientList);
          }}
        >
          use datos
        </button>
      </div>
    </>
  );
}

export default ClientList;
