import { useState } from "react";
import { useSeller } from "../../contexts/SellerContext";
import { useStatus } from "../../contexts/StatusContext";

const FormRoute = () => {
    const { sellerList } = useSeller();
    const { statusList } = useStatus();
  return (    
    <>
    <form >
        <label htmlFor="name">Nombre de la Ruta</label>
        <input type="text" name="name"/>
        <br />
        <label htmlFor="dateStart">Fecha Inicio</label>
        <input type="text" name="dateStart"/>
        <br />
        <label htmlFor="dateEnd">Fecha Inicio</label>
        <input type="text" name="dateEnd"/>
        <br />
        <label htmlFor="id_seller">Vendedor</label>
        <select
              name="id_seller"
              value={sellerList[0].Name}
              onChange={(e)=>{console.log(e.target.value)}}
            >
              {sellerList.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.Name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="id_seller">Estado</label>
        <select
              name="id_seller"
              value={statusList[0].name}
              onChange={(e)=>{console.log(e.target.value)}}
            >
              {statusList.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <br />
        <label htmlFor="idStatus">Estado</label>
        <button onClick={()=>{console.log('Crear Ruta')}}>Crear Ruta</button>
    </form>
    </>
  )
}

export default FormRoute