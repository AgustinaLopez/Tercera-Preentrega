//Configuracion Inicial de Socket del lado del Cliente
const socket = io();

socket.on('mensaje2', data =>{
    console.log(data);
})