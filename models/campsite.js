//where we define mongoose schema and the model for all documents in databases campsites collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const campsiteSchema = new Schema({
  name: { //1st argument is required
    type: String, 
    required: true, 
    unique: true //no 2 docs in collection should have same name field
  },
  description: {
    type: String,
    required: true
  }
}, { //2nd optional argument for configuration options
  timestamps: true, //will cause Mongoose to auto add 2 props to schema called createdAt and updatedAt
});

//model that uses schema
const Campsite = mongoose.model('Campsite', campsiteSchema); //creates a model named Campsites - 1st argument needs to be capitalized and singularized version - mongoose will automatically look for lower-case, plural version; 2nd argument is the schema you want to use
//this model will be used to instantiate documents for mongodb

module.exports = Campsite;