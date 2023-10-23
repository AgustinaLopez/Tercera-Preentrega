const socket = io();
let user;
const chatBox = document.getElementById('chatBox')

Swal.fire({
    icon: 'info',
    title: "Escribe tu Nombre",
    input: 'text',
    text: "Ingrese su nombre para identificarse en el chat",
    inputValidator: (value) => {
        if (!value) {
            return "Necesitas escribir tu Nombre"
        } else {
            socket.emit('userConnected', { user: value })
        }
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    const myName = document.getElementById('myName')
    myName.innerHTML = user;
})


// Guardado y muestra de mensajes
chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value })
            chatBox.value = '';
        }
    }
})


// Escuchamos a todos los usuarios que estan conectados
socket.on('messageLogs', data => {
    const messageLog = document.getElementById('messageLogs')
    let logs = '';
    data.forEach(log => {
        logs += `${log.user} dice: ${log.message}<br/>`
    });
    messageLog.innerHTML = logs;
})

socket.on('userConnected', data => {
    console.log(data);
    let message = `Nuevo usuario conectado: ${data}`
    Swal.fire({
        icon: "info",
        title: 'Nuevo usuario conectado',
        text: message,
        toast: true,
    })
})

// close chatBox
const closeChatBox = document.getElementById('closeChatBox')
closeChatBox.addEventListener('click', evt => {
    socket.emit('closeChat', { close: "close" })
    messageLog.innerHTML = '';
})