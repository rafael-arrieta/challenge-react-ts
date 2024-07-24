import { UserData } from "./UserData.model";

export interface LoginContextType {
    isLoggedIn: boolean;
    userData: UserData;
    setIsLoggedIn: (status: boolean) => void;
    updateUserData: (id: string, name: string, token: string, isAdmin: boolean) => void;
    getUserData: () => UserData;
}