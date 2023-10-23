import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

mongoose.set("strictQuery", false);
const MessageModel = mongoose.model(messageCollection, messageSchema);

export default MessageModel;