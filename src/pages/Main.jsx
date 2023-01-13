import { useState, useEffect, Suspense } from "react";
import Map from "./Map";
import ClientList from "./ClientList";
import Calendar from "./Calendar";
import SalesReport from "./SalesReport";
import Notes from "./Notes";
import { client } from "../backend/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ClientProvider } from "../contexts/ClientContext";

function Main() {
  const [currentTab, setCurrentTab] = useState("map");
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  console.log(user, isAuthenticated());
  /* useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);*/
  //if(!user) return <p>Loading</p>
  return (
    <ClientProvider>
      <div className="main-screen">
        <nav className="main-nav">
          <button
            className={`nav-button ${currentTab === "map" && "active"}`}
            onClick={() => setCurrentTab("map")}
          >
            Map
          </button>
          <button
            className={`nav-button ${currentTab === "clients" && "active"}`}
            onClick={() => setCurrentTab("clients")}
          >
            Clients
          </button>
          <button
            className={`nav-button ${currentTab === "calendar" && "active"}`}
            onClick={() => setCurrentTab("calendar")}
          >
            Calendar
          </button>
          <button
            className={`nav-button ${currentTab === "sales" && "active"}`}
            onClick={() => setCurrentTab("sales")}
          >
            Sales
          </button>
          <button
            className={`nav-button ${currentTab === "notes" && "active"}`}
            onClick={() => setCurrentTab("notes")}
          >
            Notes
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </nav>
        Wellcome
        <div className="main-content">
          {currentTab === "map" && <Map />}
          {currentTab === "clients" && <ClientList />}
          {currentTab === "calendar" && <Calendar />}
          {currentTab === "sales" && <SalesReport />}
          {currentTab === "notes" && <Notes />}
        </div>
      </div>
    </ClientProvider>
  );
}

export default Main;
