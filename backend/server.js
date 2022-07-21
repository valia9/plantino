const express = require('express');
const Plant = require('./models/Plant');
const connectDB = require("./db/db.js");
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config({ path: './sample.env' });

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/mylist", async (req, res) => {
    try {
        const plants = await Plant.find().sort({lastWatered: -1});
        res.status(200).send(plants);
     } catch (err) {
        console.log(err);
        res.status(500).send();
     }
    })

    app.patch("/mylist", async (req, res) => {
        const id = req.body;
        const date = new Date();
        // console.log(date)
        // console.log(id)
        try {
        const plant = await Plant.findOneAndUpdate(
            { "_id": id } , 
            { $set: { lastWatered: date } }
            );
        await plant.save();
    } catch (err) {
        console.log(err);
        res.status(500).send();
     }
    })

app.post("/addplant", async (req, res) => {

    const {name, lastWatered, daysBtwWatering, notes} = req.body;

    const newPlant = await Plant.create({
        name,
        lastWatered,
        daysBtwWatering,
        notes,
    }); 
    
    console.log(newPlant);

	newPlant.save((err, plant) => {
		if (err) {
			res.send(err);
		}
		res.json(plant);
	});
});


app.listen(PORT, console.log(`Server running`));