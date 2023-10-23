import mongoose from "mongoose";
import { codeGenerator } from "../../utils.js";

const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    amount: Number,
    purchaser: String
}, { timestamps: { createdAt: 'purchase_datetime', updatedAt: false } }
)

ticketSchema.pre('save', async function (next) {
    this.code = await codeGenerator()
    next()
})

mongoose.set("strictQuery", false);
const TicketModel = mongoose.model(ticketCollection, ticketSchema)

export default TicketModel