const socket = io();
const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const usersList = document.querySelector('#users')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true});


// Join chat room
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers',({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    outputMessage(message)

    // Scroll bottom 
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage',msg)

    //Clear input
    e.target.elements.msg.value = '';
});

// Output message
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div)
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users){
    usersList.innerHTML = `
    ${users.map(users => `<li>${users.username}</li>`).join()}`;

}