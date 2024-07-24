import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../components/Firebase/FirebaseConfig";
import { FavoriteData } from "../models/favoriteData.model";

// Función para obtener todos los favoritos filtrados por userId
export const fetchFavoritesByUserId = async (userId: string): Promise<FavoriteData[]> => {
    const favoritesCollectionRef = collection(firestore, "favorites");

    try {
        const q = query(favoritesCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const data: FavoriteData[] = [];

        querySnapshot.forEach((doc: any) => {
            const documentData = doc.data();
            data.push({ ...documentData, id: doc.id });
        });

        return data;
    } catch (error) {
        console.error("Error fetching Favorites by userId:", error);
        throw new Error("Error fetching Favorites by userId");
    }
};

// Función para crear un nuevo favorito
export const createFavorite = async (favorite: FavoriteData): Promise<void> => {
    try {
        const favoritesCollectionRef = collection(firestore, 'favorites');
        await addDoc(favoritesCollectionRef, favorite);
        console.log('Favorite created successfully');
    } catch (error) {
        console.error('Error creating favorite:', error);
        throw new Error('Error creating favorite');
    }
};

// Función para eliminar un favorito por ID
export const deleteFavorite = async (id: string): Promise<void> => {
    try {
        const favoriteRef = doc(firestore, 'favorites', id);
        await deleteDoc(favoriteRef);
        console.log('Favorite deleted successfully');
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw new Error('Error deleting favorite');
    }
};