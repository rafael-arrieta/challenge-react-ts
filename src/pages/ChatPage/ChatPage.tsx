import { useParams } from "react-router-dom";
import { useLoginContext } from "../../services/LoginContext";
import { useEffect, useRef, useState } from "react";
import { Message } from "../../models/Message.model";
import { fetchMessagesByUserId } from "../../services/fetchMessages.service";

import './ChatPage.css';
import { Button } from "react-bootstrap";

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getUserData } = useLoginContext();
    const userData = getUserData();

    const [chats, setChats] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<Message>({} as Message);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const messages = [
        'message 1',
        'message 2',
        'message 3',
        'message 4',
        'message 5',
        'message 6',
        'message 7',
        'message 8',
        'message 9',
        'message 10',
        'message 11',
        'message 12',
        'message 13',
        'message 14',
    ]

    useEffect(() => {
        // TODO: traer chats del usuario
        // Si hay un id, traer o crear el char por la unidad

        const fetchChats = async () => {
            try {
                const chats = await fetchMessagesByUserId(userData.id);
                setChats(chats);
                const current = chats.find(chat => chat.id === id);
                if (current) {
                    console.log(current);
                    setCurrentChat(current);
                }

            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };



        
        fetchChats();

    }, [userData])

  return (
    <div className="chat-page-container">
        <div className="chat-list-sidenav">
            {// TODO: mostrar listado de chats

            }
        </div>
        <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            {message}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-container">
                    <input type="text" placeholder="Escribe un mensaje..." />
                    <Button type="button">Enviar</Button>
                </div>
        </div>
    </div>
  )
}

export default ChatPage