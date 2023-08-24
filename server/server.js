import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { DateTime } from 'luxon'; // Import Luxon's DateTime

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://nurium:q2SvFGyNeYdSgP4X@saunacluster.wjfc1vm.mongodb.net/'; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = 'sauna_booking';

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const database = client.db(dbName);
    const bookingCollection = database.collection('bookings');

    app.post('/api/book', async (req, res) => {
      const selectedDate = req.body.date;
      const selectedTimeSlot = req.body.timeSlots;
      const user = 'example_user'; // Simulated user

      console.log('Booking request received:', selectedDate, selectedTimeSlot);



      const db = client.db();
      const collection = db.collection('sauna_collection');
  
       // Check if the selected time slot is available
       const existingBooking = await collection.findOne({ date: selectedDate, timeSlot: selectedTimeSlot });
       if (existingBooking) {
         console.log('Selected time slot is already booked');
         return;
       }
   
       // Insert the booking
       const bookingData = {
         user: user,
         date: selectedDate,
         timeSlot: selectedTimeSlot
       };
   
       const insertResult = await collection.insertOne(bookingData);
       console.log('Booking inserted:', insertResult.insertedId);


    });




    

    
    app.get('/api/booked', async (req, res) => {
      try {

 // Set CORS headers to allow requests from https://bastu.webflow.io
 res.header("Access-Control-Allow-Origin", "https://olivprodukter.se/");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    

        console.log('Fetched Bookings');
        // Fetch booked items from the database and send them in the response
        const db = client.db();
        const collection = db.collection('sauna_collection');
        
        // Modify this logic to retrieve booked items
        const bookedItems = await collection.find({/* Your query here */}).toArray();
    
        res.json({ success: true, bookedItems });
      } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ success: false, error: 'An error occurred while fetching booked items.' });
      }
    });
    





    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

startServer();
