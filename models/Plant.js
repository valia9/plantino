const mongoose = require('mongoose')

const PlantSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Please, add the name of your plant'],
    uniqie: true,
  },
  lastWatered: {
    type: Date, 
    required: [true, 'Please, add the day when you last watered your plant']
  },
  daysBtwWatering: {
    type: Number, 
    required: [true, 'Please, add the recommended amount of days between watering for this plant']
  },
  notes: {
    type: String,
    required: false,
    default: undefined
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true }
)

module.exports = Plant = mongoose.model('Plant', PlantSchema);