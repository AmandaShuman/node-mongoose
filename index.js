const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite'; //connect us to campsitedb in mongodb server 
const connect = mongoose.connect(url, { //next 3 options deal with handling deprecation warnings from mongodb node driver
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}) //connect wrapper around mongodb node drivers connect method (like connecting with Mongo.client using mongoose)

connect.then(() => {

  console.log('Connected correctly to server');

  Campsite.create({ //creates new document based on mongoose model
    name: 'React Lake Campgrounds',
    description: 'test'
  }) //auto-saves now 
  .then(campsite => {
    console.log(campsite); //will show original doc

    return Campsite.findByIdAndUpdate(campsite._id, {
      $set: { description: 'Updated Test Document' }
    }, {
      new: true //will cause method to return updated document; otherwise, we would get the original before the update
    });
  })
  .then(campsite => {
    console.log(campsite); //will show doc with updated description

    campsite.comments.push({ //add comments subdoc
      rating: 5,
      text: 'What a magnificent view!',
      author: 'Tinus Lorvaldes'
    });

    return campsite.save(); //need in order for subdoc update to take effect
  })
  .then(campsite => { 
    console.log(campsite); //now just getting single campsite doc rather than an array of campsites
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