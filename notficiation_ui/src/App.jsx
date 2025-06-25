/*import React, { useEffect, useState } from "react";
import "./App.css";
import ChatDashboard from "./components/NotificationDashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateToken, messaging } from "./notification/firebase";
import { onMessage } from "firebase/messaging";

function App() {
  const [__token, setToken] = useState(null);

  useEffect(() => {
    generateToken().then(fcmToken => {
      if (fcmToken) {
        setToken(fcmToken);
        console.log("🔑 FCM Token:", fcmToken);
      } else {
        console.warn("❌ Pas de token FCM généré");
      }
    });

    const unsubscribe = onMessage(messaging, payload => {
      toast(
        <div>
          <strong>{payload.notification?.title}</strong><br/>
          {payload.notification?.body}
        </div>,
        { type: "info", position: "top-right" }
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={5000} />
      <ChatDashboard />
    </div>
  );
}

export default App;
*/


import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AndroidDashboard from "./components/Dashboard";

function App() {


  

  return (
    <div className="App">
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Indicateur de statut en haut */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000
      }}>
        <div style={{
          background: 'rgba(76, 175, 80, 0.9)' ,
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
         
        </div>
      </div>

     
      
      

      <AndroidDashboard  />
    </div>
  );
}

export default App;