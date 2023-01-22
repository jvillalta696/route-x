import { useState,useEffect } from "react";
import FormRoute from "../componets/routes/FormRoute";


function Map() {
const [currentView, setCurrentView] = useState('')


const handleView = (view) =>{
  setCurrentView(view)
}



  return (
   <>
   <button onClick={()=>{handleView('new-route')}}>Crear Nueva Rutas</button>
   <button>Lista de rutas</button>
   <div>Map</div>
  

   {currentView === 'new-route' && <FormRoute/>}

   </>
  )
}

export default Map