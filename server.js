const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const { v4 : uuidV4 } = require('uuid')
const path = require('path')

// CORS and Headers
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     next();
// });
app.set('view engine','ejs');
// app.use(express.static('public'));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) =>{
    // res.redirect(`/${uuidV4()}`);
    res.redirect('/index');
})

app.get('/index', (req, res)=>{
    res.render('index');
})


app.get('/room/:room', (req,res)=>{
    res.render('room',{roomId : req.params.room, userName : req.query.username })
})

io.on("connection", (socket) => {
    socket.on('join-room', (roomId,userId) =>{
        console.log(roomId,userId);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId)
        socket.on('disconnect', () =>{
            socket.to(roomId).emit('user-disconnected',userId);
        })
    })

});


server.listen(3000);



