const express = require("express");
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();

const url = 'mongodb+srv://@cluster0.qql66.mongodb.net/locations?retryWrites=true&w=majority';
const client = new MongoClient(url);
const locationStorage = {
  locations: [],
};

async function run(req, res, id) {
    try {
      await client.connect();
      const database = client.db('locations');
      database.collection('user-locations').insertOne({
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng }
      }, function(err, r) {
          console.log(r);
          res.json({message: 'Stored location!', locId: id});
      });
     
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  router.post('/add-location', (req, res, next) => {
    // const id = Math.random();
    client.connect(function(err, client) {
      const db = client.db('locations');
  
      // Insert a single document
      db.collection('user-locations').insertOne(
        {
          address: req.body.address,
          coords: { lat: req.body.lat, lng: req.body.lng }
        },
        function(err, r) {
          // if (err) {}
          console.log(r);
          res.json({ message: 'Stored location!', locId: r.insertedId });
        }
      );
    });
});
router.get('/location/:lid', (req, res, next) => {
    const locationId = req.params.lid;
  
    client.connect(function(err, client) {
      const db = client.db('locations');
  
      // Insert a single document
      db.collection('user-locations').findOne(
        {
          _id: new mongodb.ObjectId(locationId)
        },
        function(err, doc) {
          // if (err) {}
          if (!doc) {
            return res.status(404).json({ message: 'Not found!' });
          }
          res.json({ address: doc.address, coordinates: doc.coords });
        }
      );
    });
  });
  
module.exports = router;
