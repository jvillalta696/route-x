import React from "react";

const ClientCard = ({client}) => {
  return (
    <div >
      <div >{client.name}</div>
      <div >{client.address}</div>
      <div >{client.status}</div>
      <button onClick={() => navigateToClientDetails(client.id)}>View details</button>
    </div>
  );
};

const navigateToClientDetails = (id)=>{
  console.log('Show Data from id:'+id)
}

export default ClientCard;