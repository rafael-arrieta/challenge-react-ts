import { FC } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/FirebaseConfig';
import { Button } from 'react-bootstrap';
import { useLoginContext } from '../../services/LoginContext';


interface GoogleLoginButtonProps {
  isAdmin: boolean; // Propiedad booleana
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({ isAdmin }) => {

  const { updateUserData, getUserData } = useLoginContext();
  const userData = getUserData();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      console.log('User Info:', result.user.uid);
      console.log('User Info:', result.user.displayName);
      console.log('User Info:', result.user.email);
      
      
      updateUserData(result.user.uid, result.user.displayName ? result.user.displayName : '', token, isAdmin);
    } catch (error) {
      console.error('Error logging in with Google', error);
    }
  };

  const handleLogout = () => {
    updateUserData('', '', '', false);
  };

  console.log('User Data:', userData);
    
  return (
    <>
      { userData.token === '' && userData.name === ''  ?
        <Button onClick={handleLogin}>
          Login
        </Button> :

        <Button onClick={handleLogout}>
          Logout
        </Button>
      }
    </>
  );
};

export default GoogleLoginButton;