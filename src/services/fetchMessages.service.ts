import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../components/Firebase/FirebaseConfig";
import { Message, PartialMessage } from "../models/Message.model";


export const fetchMessagesByUserId = async (userId: string): Promise<Message[]> => {
    const messagesCollectionRef = collection(firestore, "messages");

    try {
        const q = query(messagesCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const data: Message[] = [];

        querySnapshot.forEach((doc: any) => {
            const documentData = doc.data();
            data.push({ ...documentData, id: doc.id });
        });

        return data;
    } catch (error) {
        console.error("Error fetching messages by userId:", error);
        throw new Error("Error fetching messages by userId");
    }
};

export const fetchMessageCollectionData = async () => {
    const MessageCollectionRef = collection(firestore, "messages");

    try {
        
        const querySnapshot = await getDocs(MessageCollectionRef);
        const data: Message[] = [];

        querySnapshot.forEach((doc: any) => {
            const documentData = doc.data();
            data.push({ ...documentData, id: doc.id });
        });

        return data;
    } catch (error) {
        console.error("Error fetching Message collection data:", error);
    }
};

export const fetchMessageByProductId = async (productId: string): Promise<Message | null> => {
    const messagesCollectionRef = collection(firestore, "messages");

    try {
        const q = query(messagesCollectionRef, where("productId", "==", productId), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const messageDoc = querySnapshot.docs[0];
            return messageDoc.data() as Message;
        } else {
            return null; 
            // Si no se encontró ningún documento
        }
    } catch (error) {
        console.error("Error fetching Message by productId:", error);
        throw new Error("Error fetching Message by productId");
    }
};

export const createMessage = async (message: PartialMessage): Promise<void> => {
    try {
        const messagesCollectionRef = collection(firestore, 'messages');
        await addDoc(messagesCollectionRef, message);

    } catch (error) {
        console.error('Error creating message:', error);
        throw new Error('Error creating message');
    }
};

export const updateMessage = async (message: PartialMessage, id: string): Promise<void> => {
    try {
      const messageRef = doc(firestore, 'messages', id);
      await setDoc(messageRef, message);
    } catch (error) {
      console.error('Error saving message:', error);
      throw new Error('Error saving message');
    }
};

// Función para eliminar un favorito por ID
export const deleteMessage = async (id: string): Promise<void> => {
    try {
        const messageRef = doc(firestore, 'messages', id);
        await deleteDoc(messageRef);
    } catch (error) {
        console.error('Error deleting message:', error);
        throw new Error('Error deleting message');
    }
};