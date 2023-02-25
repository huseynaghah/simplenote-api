const express = require('express');
const { default: mongoose } = require('mongoose');
const { userRouter } = require('./routes/UserRouter')

const app = express();

app.use(express.json());
app.use(express.urlencoded());
 

mongoose.connect("mongodb+srv://huseynaghah:Georgia2019++@cluster0.z3umjhj.mongodb.net/simplenote")
    .then(res => {
        console.log('Connect!');
    })
    .catch(err => {
        console.log('err', err);
    })

app.use('/api/users', userRouter);

app.listen(8070);