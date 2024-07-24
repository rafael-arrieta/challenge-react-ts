import { FC } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/FirebaseConfig';
import { Button } from 'react-bootstrap';
import { useLoginContext } from '../../services/LoginContext';
import { useNavigate } from 'react-router-dom';


interface GoogleLoginButtonProps {
  isAdmin: boolean; // Propiedad booleana
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({ isAdmin }) => {

  const { updateUserData } = useLoginContext();
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      
      updateUserData(result.user.uid, result.user.displayName ? result.user.displayName : '', token, isAdmin);
      navigate('/');
    } catch (error) {
      console.error('Error logging in with Google', error);
    }
  };


  return (
    <>
      <Button variant="success" onClick={handleLogin}>
          Login
      </Button>
    </>
  );
};

export default GoogleLoginButton;