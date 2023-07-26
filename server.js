

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const rooms = { }
let userName;
let difficulty,time;


app.get('/login', (req, res) => {
  res.render('index', { rooms: rooms })
})
 
app.get('/practice', (req, res) => {
  res.render('practice',{Username:userName})
})
app.get('/gaming', (req, res) => {
  res.render('gaming',{Username:userName})
})

app.get('/single', (req, res) => {
  res.render('single')
})

app.get("/game",function(req,res){
  res.render('game');
});

app.post('/single', (req, res) => {
  difficulty = req.body.difficulty;
  time = req.body.time;
  console.log(difficulty,time)
  res.render('practice',{Username:userName,Difficulty:difficulty,Time:time})
})
 

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  res.render('room', { roomName: req.params.room })
  // console.log((rooms[req.params.room].users).length);
})



app.get('/',function(req,res){
  res.render('login');
});

app.post('/',function(req,res){
  userName = req.body.Username;
  console.log(userName);
  res.render('single');
});


server.listen(3000)

let usernames = {}

// let users = 0;

let players = 0;

io.on('connection', socket => {
  // let room;
  socket.on('new-user', (room, name) => {
    
    room = room;
    socket.join(room)
    rooms[room].users[socket.id] = name
    // rooms[room].players++;
    players++;
    // rooms[room].users++;
    console.log("users count", players)
    socket.to(room).emit('user-connected',name ,players)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('start-game', (room, message) => {
    socket.to(room).emit('start-the-game', { message: message})
  })
  socket.on('send-score', (room,score) => {
    console.log(score)
    socket.to(room).emit('send-user-score', {score:score})
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      players--;
      socket.to(room).emit('user-disconnected', rooms[room].users[socket.id],players)
      delete rooms[room].users[socket.id]
    })
  })
})



function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}