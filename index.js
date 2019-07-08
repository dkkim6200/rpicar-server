const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/', (req, res) => res.render('control'));
// app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const clamp = (num, min, max) => {
  return num <= min ? min : num >= max ? max : num;
}

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('forward', () => {
    console.log('Go forward my guys');
    io.emit('go forward');
  });
  socket.on('backward', () => {
    console.log('Go backward my guys');
    io.emit('go backward');
  });
  socket.on('turn left', () => {
    console.log('Turn left my guys');
    io.emit('turn left');
  });
  socket.on('turn right', () => {
    console.log('Turn right my guys');
    io.emit('turn right');
  });

  socket.on('stop', () => {
    console.log('Stop');
    io.emit('stop');
  });

  socket.on('set servo', (coord) => {
    console.log(`X: ${clamp(coord.x, 0, 1)}, Y: ${clamp(coord.y, 0, 1)}`);
    io.emit('set servo', coord);
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});