const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRouter')
const noteRouter = require('./routes/NoteRouter')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://huseynaghah:Georgia2019++@cluster0.z3umjhj.mongodb.net/simplenote', {
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



app.listen(8090, () => {
  console.log('Server started on port 8090');
});