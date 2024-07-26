import { useParams } from "react-router-dom";
import { useLoginContext } from "../../services/LoginContext";
import { useEffect, useState } from "react";
import { Chat, Message, PartialMessage } from "../../models/Message.model";
import { createMessage, fetchMessageCollectionData, fetchMessagesByUserId, updateMessage } from "../../services/fetchMessages.service";

import './ChatPage.css';
import { Button } from "react-bootstrap";
import { getProductById } from "../../services/fetchProducts.service";

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getUserData } = useLoginContext();
    const userData = getUserData();

    const [chats, setChats] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<Message>({} as Message);
    const [inputText, setInputText] = useState<string>('');

    useEffect(() => {
        /* TODO: 
            Traer chats del usuario
            Si hay un id, traer o crear el char por la unidad
            
        */
        if(userData.isAdmin){
            fetchMessageCollectionData().then(chats => {
                if(!chats) return;
                setChats(chats);
                const current = chats.find(chat => chat.productId === id);
                
                if (current) {
                    setCurrentChat(current);
                }else{
                    setCurrentChat({} as Message);
                }
            })

        }else{
            fetchMessagesByUserId(userData.id).then(chats => {
                setChats(chats);
                const current = chats.find(chat => chat.productId === id);
                if (current) {
                    console.log(current);
                    
                    setCurrentChat(current);
                }else{
                    setCurrentChat({} as Message);

                    id && getProductById(id).then(product => {
                        product && 
                        setInputText(`Hola, me puedes ayudar con ${product.make}, modelo ${product.model}, año ${product.year}, id "${id}"?`);
                    });
                }
                });
        }
    }, [])

    const sendMassage = async () => {
        try{
            if(currentChat.id){
                console.log(currentChat.messages);

                const messages: Chat[] = [...currentChat.messages, {
                    userName: userData.name,
                    text: inputText,
                    date: new Date(),
                    isResponse: 'user'
                }];
                if(id){
                    const chat:PartialMessage = {
                        userId : userData.id,
                        productId: id,
                        messages: messages,
                        readed: false
                    }

                await updateMessage(chat, currentChat.id);
                }
            }else{
                if(id){
                    const newChat:PartialMessage = {
                        userId : userData.id,
                        productId: id,
                        messages: [
                            {
                                userName: userData.name,
                                text: inputText,
                                date: new Date(),
                                isResponse: 'user'
                            }
                        ],
                        readed: false
                    }
                    await createMessage(newChat);

                }
            }
            setInputText('');
        }catch(error){
            console.error(error);
        }
    }

  return (
    <div className="chat-page-container">
        <div className="chat-list-sidenav">
            {chats.map((chat, index) => (
                <li key={index} onClick={() => setCurrentChat(chat)}>{chat.productId}</li>
                ))
            }
        </div>
        <div className="chat-container">
                <div className="chat-messages">
                    {currentChat.id && currentChat.messages.map((message, index) => (
                        <div key={index} className="message">
                            <strong>{message.isResponse}: {message.userName}</strong>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>

                
                <form className="chat-input-container">
                    <input 
                        type="text" 
                        placeholder="Escribí tu mensaje..." 
                        value={inputText}
                        onChange={e => setInputText(e.target.value)} />
                    <Button type="button" variant="primary" onClick={ () => sendMassage()}>Enviar</Button>
                </form>
        </div>
    </div>
  )
}

export default ChatPage