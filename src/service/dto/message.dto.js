export default class MessageDTO {
    constructor(message) {
        this.id = message.id || message._id || ""
        this.user = message.user
        this.message = message.message
    }
}