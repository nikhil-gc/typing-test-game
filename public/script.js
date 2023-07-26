const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userCount = document.getElementById('room-strength')
// let name;
if (messageForm != null) {
  const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

let time = 0;
const timeInterval = setInterval(updateTime, 1000);
function updateTime() {
  time++;
  if(timeLeft==0){
    timeLeft = -1;
    const msg = "game completed , wpm - "  + wpm
    socket.emit('send-chat-message', roomName, msg)
  }
}
// function startGame(){
//   socket.emit('start-game',roomName,"start-game");
// }


// let users = 1;
// userCount.innerHTML = users;

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
  
})

document.getElementById('wrapper').style.display = "none";

socket.on('chat-message', data => {
  username = data.name
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('start-the-game', data => {
  // appendMessage(`${data.name}: ${data.message}`)
  window.location.href = "game";
})


socket.on('user-connected', (nam,users)=> {
  // const users = users
  userCount.innerHTML = users;
  appendMessage(`${nam} connected`)
  if(users>=2){
    alert("You can start the game")
    document.getElementById('wrapper').style.display = ""
  }
})

socket.on('user-disconnected', (nam,users) => {
  // const users = data.users
  userCount.innerHTML = users;
  appendMessage(`${nam} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}


// --------------

