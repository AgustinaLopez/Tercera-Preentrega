import {ticketModel} from "../dao/models/ticket.model.js";

export default class TicketsService {
    constructor() { 
        console.log("Usando carritos con persistencia DB en mongodb");
    }

    getAll = async () => {
        let tickets = await ticketModel.find();
        return tickets.map(ticket=>ticket.toObject());
    }
    save = async (ticket) => {
        let result = await ticketModel.create(ticket);
        return result;
    }

    deleteTicket = async (id) => {
        let result = await ticketModel.delete(id);
        return result;
    }
}
