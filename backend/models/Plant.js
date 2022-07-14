const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Please, add the name of your plant']
  },
  lastWatered: {
    type: Date, 
    required: [true, 'Please, add the day when you last watered your plant']
  },
  daysBtwWatering: {
    type: Number, 
    required: [true, 'Please, add the recommended amount of days between watering for this plant']
  },
  notes: String,
},
{ timestamps: true }
)

module.exports = Plant = mongoose.model('Plant', plantSchema);