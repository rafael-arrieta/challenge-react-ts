import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../components/Firebase/FirebaseConfig";
import { PruebaData } from "../models/pruebaData.model";

export const fetchPruebaCollectionData = async () => {
    const pruebaCollectionRef = collection(firestore, "prueba");

    try {
        const querySnapshot = await getDocs(pruebaCollectionRef);
        const data: PruebaData[] = [];

        querySnapshot.forEach((doc: any) => {
            const documentData = doc.data();
            data.push({ ...documentData, id: doc.id });
        });

        return data;
    } catch (error) {
        console.error("Error fetching prueba collection data:", error);
    }
};
