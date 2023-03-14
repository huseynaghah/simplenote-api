const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken')
const userRouter = require('./routes/UserRouter')
const noteRouter = require('./routes/NoteRouter')

const app = express();

app.use(cors());
app.use(express.json());

let privateKey = "ironmaidenironmaidenironmaidenironmaiden";

// app.use((req, res, next) => {

//   if (req.url == '/api/users/signin' || req.url == '/api/users/signup' || req.url == "/api/users/verify") {
//    return next();
//   }

//   let auth = req.headers.authorization?.split(' ');
//   let token = '';

//   if (auth) {
//     if (auth.length == 2) {
//       token = auth[1];
//     }
//     else {
//       res.status(401).json({ 'message': 'Access Error!' })
//     }
//   }
//   else {
//     res.status(401).json({ 'message': 'Access Error!' })
//   }
//   jwt.verify(token, privateKey, function (err, decode) {
//     if (err) {
//       res.status(401).json(err);
//     }
//     else {
//       next()
//     }
//   })

// })


mongoose.connect('mongodb+srv://haqverdievh:Georgia2019++@cluster0.knjxr8n.mongodb.net/simplenote', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);



app.listen(process.env.PORT, () => {
  console.log('Server started on port 8090');
});