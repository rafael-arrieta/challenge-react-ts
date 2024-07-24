import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

export const getProductById = async (id: string): Promise<ProductData | null> => {
    try {
      const productRef = doc(firestore, 'productos', id)
      const docSnap = await getDoc(productRef);
  
      if (docSnap.exists()) {
        // Devuelve el producto
        return docSnap.data() as ProductData;
      } else {
        // Documento no encontrado
        return null;
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Error fetching product');
    }
};

export const saveProduct = async (product: ProductData, id: string): Promise<void> => {
    try {
      const productRef = doc(firestore, 'productos', id);

      await setDoc(productRef, product);
  
      console.log('Product saved successfully');
    } catch (error) {
      console.error('Error saving product:', error);
      throw new Error('Error saving product');
    }
};

export const createProduct = async (product: ProductData): Promise<void> => {
    try {
      // Referencia a la colección 'productos'
      const productsRef = collection(firestore, 'productos');
  
      // Agrega un nuevo documento a la colección 'productos' con un ID generado automáticamente
      await addDoc(productsRef, product);
  
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Error creating product');
    }
  };
