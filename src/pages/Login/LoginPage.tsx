import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import "./LoginPage.css"
import { useState } from "react";

export const LoginPage = () => {

  const [adminValue , setAdminvalue] = useState(false)
  
  const toggleAdmin = () => {
    setAdminvalue(!adminValue)
  }

  return (
    <div className="login-page-container">
      <div className="login-card">

        <h2>Log in</h2>
          <GoogleLoginButton isAdmin={adminValue}/>
          <p className="admin-button" onClick={toggleAdmin}>{ !adminValue ? "Hacé 'Click' para inicia como admin" : "Sos administrador"}</p>
      </div>
    </div>
  )
}
