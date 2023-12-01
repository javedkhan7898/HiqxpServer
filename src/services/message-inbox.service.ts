import IMessage from "../interfaces/message-inbox.interface";
import MessageRepository from "../repositories/message-inbox.repository";

class MessageService {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  public async getMessage(params?) {
    const getMessage = await this.messageRepository.getMessage(params);
    return getMessage;
  }

  public async createMessage(message: IMessage): Promise<any> {
    const createMessage = await this.messageRepository.createMessage(message);
    return createMessage;
  }

  public async updateMessage(message: any, messageId: any): Promise<any> {

    const updateMessage = await this.messageRepository.updateMessage(message, messageId);
    return updateMessage;
  }

  public async deleteMessage(messageId: string): Promise<any> {
    const deleteMessage = await this.messageRepository.deleteMessage(messageId);
    return deleteMessage;
  }
}

export default MessageService;