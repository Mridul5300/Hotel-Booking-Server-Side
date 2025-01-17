const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// midleWare 
const corsOptions = {
  origin: [
    'http://localhost:5173',
    "http://localhost:5174"
  ],
  Credentials: true,
  // optionSuccessStatus :200
}
app.use(cors(corsOptions))
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1mv6arg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const hotelService = client.db('hotelBoking').collection('user');
    const bookingCollection = client.db('hotelBoking').collection('bookings')
    


      app.get('/user', async (req, res) => {
        const reuslt = await hotelService.find().toArray();
        res.send(reuslt)
      })
  
  

    //  detail page kaj
    app.get('/roomdetails/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await hotelService.findOne(query);
      res.send(result);
    });

    // review api
    app.get('/roomdetail/:id', async (req, res) => {
      const roomId = req.params.id;
      const query = ({_id: new ObjectId(roomId) })
      const reviews = await reviewService.find(query).toArray();
      res.send(reviews);
    });

    // booking api
    app.get('/bookings', async (req, res) => {
      console.log(req.query.email);
      let query ={};
      if(req.query?.email){
          query = {email: req.query.email}
      }
      const reuslt = await bookingCollection.find(query).toArray();
      res.send(reuslt);
    })

    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  req.send('hotel server sart')
})

app.listen(port, () => {
  console.log('hotel is sever ready');
})