export interface Message {
    id: string;
    userId: string;
    productId: string;
    messages: Chat[];
    readed: boolean;
}

export interface PartialMessage {
    userId: string;
    productId: string;
    messages: Chat[];
    readed: boolean;
}

export interface Chat {
    userName: string;
    text: string;
    date: Date;
    isResponse: 'user' |'operator';
}