const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const actions = require('./methods/actions')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
actions.connect(); 
app.get('/',(req,res)=>{
    res.send("hello world");
})

app.get('/getallticker',actions.getData);
app.post('/gettickerdata',actions.getTickerDataByName);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running on port ${PORT} in ${process.env.NODE_ENV} mode`))

