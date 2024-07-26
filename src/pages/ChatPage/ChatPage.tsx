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

    const [chatId , setChatId] = useState<string>(id || '');

    const { getUserData } = useLoginContext();
    const userData = getUserData();

    const [chats, setChats] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<Message>({} as Message);
    const [inputText, setInputText] = useState<string>('');

    

    useEffect(() => {
        handleData();
    }, [])

    const handleData = () => {
        if( userData.isAdmin){
            fetchMessageCollectionData().then(chats => { 
                console.log(chats);
                if(chats){
                    setChats(chats);
                    const current = chats[0]
                    if (current) {
                        setCurrentChat(current);
                        !chatId && setChatId(current.productId)
                    }
                }
            })
        }else{
            fetchMessagesByUserId(userData.id).then(chats => {
                setChats(chats);
                const current = chats.find(chat => chat.productId === id);
                if (current) {
                    setChatId(current.productId);
                    setCurrentChat(current);
                }else{
                    setCurrentChat(chats[0]);
                    setChatId(chats[0].productId);

                    id && getProductById(id).then(product => {
                        product && 
                        setInputText(`Hola, me puedes ayudar con ${product.make}, modelo ${product.model}, año ${product.year}, id "${id}"?`);
                    });
                }
                });
        }
    }

    const sendMassage = async () => {
        try{
            if(currentChat.id){
                console.log(currentChat.messages);

                const messages: Chat[] = [...currentChat.messages, {
                    userName: userData.name,
                    text: inputText,
                    date: new Date(),
                    isResponse: userData.isAdmin ? 'operator':'user'
                }];
                if(chatId){
                    console.log(chatId);
                    
                    const chat:PartialMessage = {
                        userId : userData.id,
                        productId: chatId,
                        messages: messages,
                        readed: false
                    }

                    await updateMessage(chat, currentChat.id);
                }
            }else{
                if(chatId){
                    const newChat:PartialMessage = {
                        userId : userData.id,
                        productId: chatId,
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
            handleData();
            setChatId(chatId);
        }catch(error){
            console.error(error);
        }
    }

  return (
    <div className="chat-page-container">
        <div className="chat-list-sidenav">
            {chats.map((chat) => (
                <li key={chat.id} onClick={() => setCurrentChat(chat)}>{chat.productId}</li>
                ))
            }
        </div>
        <div className="chat-container">
                <div className="chat-messages">
                    { currentChat.id ? currentChat.messages.map((message, index) => (
                        <div key={index} className="message">
                            <strong>{message.isResponse}: {message.userName}</strong>
                            <p>{message.text}</p>
                        </div>
                    )): null}
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