import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../components/Firebase/FirebaseConfig";
import { ProductData } from "../models/productData.model";
import { Filter } from "../models/filter.model";
import { NewProduct } from "../models/newProduct";


export const fetchProductsCollectionData = async () => {
    const ProductsCollectionRef = collection(firestore, "productos");

    try {
        const q = query(ProductsCollectionRef, where("onDestroy", "==", false));
        const querySnapshot = await getDocs(q);
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

export const fetchFilteredProductsCollectionData = async (filter: Filter): Promise<ProductData[] | void> => {
  const ProductsCollectionRef = collection(firestore, 'productos');

  try {
    let q = query(ProductsCollectionRef, where('onDestroy', '==', false));

    if (filter.make?.trim()) {
      q = query(q, where('make', '==', filter.make.trim()));
    }
    if (filter.model?.trim()) {
      q = query(q, where('model', '==', filter.model.trim()));
    }
    if (filter.year?.trim()) {
      q = query(q, where('year', '==', Number(filter.year.trim())));
    }
    if (filter.priceRange?.min != null && filter.priceRange?.max != null) {
      q = query(q, where('price', '>=', filter.priceRange.min));
      q = query(q, where('price', '<=', filter.priceRange.max));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const data: ProductData[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<ProductData, 'id'>
    }));

    return data;
  } catch (error) {
    console.error('Error fetching filtered Products collection data:', error);
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

export const saveProduct = async (product: NewProduct, id: string): Promise<void> => {
    try {
      const productRef = doc(firestore, 'productos', id);
      await setDoc(productRef, product);
    } catch (error) {
      console.error('Error saving product:', error);
      throw new Error('Error saving product');
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
      const productRef = doc(firestore, 'productos', id);
  
      await updateDoc(productRef, { onDestroy: true });
  
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error deleting product');
    }
};

export const bookingProduct = async (id: string, userId: string, amount: number): Promise<void> => {
  try {
    const productRef = doc(firestore, 'productos', id);
    await updateDoc(productRef, { bookingData: { userId: userId, amount:amount }, booking: true });

  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};

export const createProduct = async (product: NewProduct): Promise<void> => {
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
