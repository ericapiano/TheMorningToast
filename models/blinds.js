var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var BlindsSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String
  },
  // `link/summary` is required and of type String
  body: {
    type: String
  }
});

// This creates our model from the above schema, using mongoose's model method
var blinds = mongoose.model("Blinds", BlindsSchema);

// Export the Article model
module.exports = blinds;
