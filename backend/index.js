const express = require('express');
const userRouter = require('./routers/useRouter');
const adminRouter = require('./routers/adminRouter');
const cors = require('cors');

//creating new express app

const app = express();

const port = 5000;

//middleware

app.use(cors({
    origin: '*'
}));

app.use(express.json()); //to parse json data from request body

app.use('/user', userRouter);
app.use('/admin', adminRouter);

//routes or endpoints
app.get('/', (req, res) => {
    res.send('Response From Express')
})

app.get('/add', (req, res) => {
    res.send('Response From Add Route')
})

app.get('/getall', (req, res) => {
    res.send('Response From Get All Route')
})

app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`);
})