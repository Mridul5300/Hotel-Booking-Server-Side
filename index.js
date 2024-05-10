const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// midleWare 
app.use(cors())
app.use(express.json());

app.get('/', (req,res) =>{
     req.send('hotel server sart')
})

app.listen(port, () => {
     console.log('hotel is sever ready');
})