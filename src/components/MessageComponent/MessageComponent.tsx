import { FC } from "react"
import { Chat, Message } from "../../models/Message.model"

interface MessageProps{
    message: Chat
}
export const MessageComponent: FC<MessageProps> = ({message}) => {

  return (
    <div>
        {message.text}
    </div>
  )
}
