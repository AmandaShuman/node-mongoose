const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite'; //connect us to campsitedb in mongodb server 
const connect = mongoose.connect(url, { //next 3 options deal with handling deprecation warnings from mongodb node driver
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}); //connect wrapper around mongodb node drivers connect method (like connecting with Mongo.client using mongoose)

connect.then(() => {

  console.log('Connected correctly to server');

  const newCampsite = new Campsite({ //creates new document based on mongoose model
    name: 'React Lake Campground',
    description: 'test'
  });

  newCampsite.save() //saves doc to database and returns promise on whether that was successful or not
  .then(campsite => {
    console.log(campsite);
    return Campsite.find();
  })
  .then(campsites => { 
    console.log(campsites);
    return Campsite.deleteMany(); //delete all docs created from campsite model
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
});