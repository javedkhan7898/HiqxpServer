import IMessage from "../interfaces/message-inbox.interface";
import Messages from "../schemas/message-inbox.schema";

class MessageRepository {

  public async getMessage(params): Promise<IMessage[]> {
    const getMessage = await Messages.find(params).sort({ "timestamp": -1 });
    return getMessage;
  }

  public async createMessage(message: IMessage): Promise<any> {
    const createMessage = new Messages(message);
    const savedMessage = await createMessage.save();
    return savedMessage;
  }

  public async updateMessage(message: any, messageId: any): Promise<any> {

    const updateMessage = await Messages.findByIdAndUpdate(
      messageId,
      { $set: message },
      { "upsert": true }

    ).select({});
    return updateMessage;
  }

  public async deleteMessage(messageId: string): Promise<IMessage | null> {
    const deleteMessage = await Messages.findByIdAndDelete(messageId);
    return deleteMessage;
  }
}
export default MessageRepository;