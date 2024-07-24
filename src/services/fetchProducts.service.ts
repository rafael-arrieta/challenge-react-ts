import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../components/Firebase/FirebaseConfig";
import { ProductData } from "../models/productData.model";


export const fetchProductsCollectionData = async () => {
    const ProductsCollectionRef = collection(firestore, "productos");

    try {
        const querySnapshot = await getDocs(ProductsCollectionRef);
        const data: ProductData[] = [];

        querySnapshot.forEach((doc: any) => {
            const documentData = doc.data();
            data.push({ ...documentData, id: doc.id });
        });

        return data;
    } catch (error) {
        console.error("Error fetching Products collection data:", error);
    }
};
