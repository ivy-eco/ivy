export interface SendMessageDto{
    chatId:string;
    text: string
}

export interface EditMessageDto{
    chatId:string;
    messageId:string;
    text: string
}

export interface ReplyMessageDto{
    chatId: string; 
    quotedMessageId: string; 
    text: string
}