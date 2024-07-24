import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom'; 
import { useLoginContext } from '../../services/LoginContext';




const ControlPanelPage: React.FC = () => {
  const { getUserData } = useLoginContext();
  const userData = getUserData();

  
  useEffect(() => {
    
  }, [userData.isAdmin,]);

  return (
    <div className="control-panel-page-container">
      {userData.isAdmin ? (
        <Outlet/>        
      ) : (
        <p>Redirigiendo...</p>
      )}
    </div>
  );
};

export default ControlPanelPage;