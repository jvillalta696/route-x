import React, { useState } from "react";
import { updateClient } from "../../services/clietService";
import { useSeller } from "../../contexts/SellerContext";

function ClientDetailModal({ client, onClose, updateList }) {
  const [showModal] = useState(true);
  const [updatedClient, setUpdatedClient] = useState({ ...client });
  const [isUpdate, setIsUpdate] = useState(false);
  const { sellerList } = useSeller();

  const handleInputChange = (event) => {
    setUpdatedClient(
      {
        ...updatedClient,
        [event.target.name]: event.target.value,
      },      
    );
    setIsUpdate(true);
    console.log(updatedClient);
  };

  const handleUpdate = async () => {
    const obj = await updateClient(updatedClient.id, updatedClient);
    if (obj.error) {
      console.log("ALERTA", obj);
    } else {
      updateList();
      onClose();
    }
  };
  /*useEffect(() => {
  console.log(updatedClient)
  
}, []);*/
  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div>
            <h3>{client.Name}</h3>
            <input
              type="text"
              name="Name"
              value={updatedClient.Name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="Phone"
              value={updatedClient.Phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="Address"
              value={updatedClient.Address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="EMail"
              value={updatedClient.EMail}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="id_category"
              value={updatedClient.id_category}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="DateLastVisit"
              value={updatedClient.DateLastVisit}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="DateNextVisit"
              value={updatedClient.DateNextVisit}
              onChange={handleInputChange}
            />
            <select
              name="id_seller"
              value={updatedClient.id_seller}
              onChange={handleInputChange}
            >
              {sellerList.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.Name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              if (isUpdate) {
                handleUpdate();
              } else {
                onClose();
              }
            }}
          >
            {isUpdate ? "Actualizar" : "OK"}
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
}

export default ClientDetailModal;
