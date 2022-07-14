const express = require('express');
const Plant = require('./models/Plant');
const connectDB = require("./db/db.js");

const dotenv = require('dotenv');
dotenv.config({ path: './sample.env' });

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, { 'Content-Type': 'text/plain' })
// //   response.end('Hello World')
// // })

app.post("/addplant", async (req, res) => {

    const {name, lastWatered, daysBtwWatering, notes} = req.body

    const newPlant = await Plant.create({
        name,
        lastWatered,
        daysBtwWatering,
        notes,
    }); 
    
    if(newPlant){
        res.status(201).json({
            name: newPlant.name,
            _id: newPlant._id

        })
    }

	// let newPlant = new Plant(req.body);

	// newPlant.save((err, plant) => {
	// 	if (err) {
	// 		res.send(err);
	// 	}
	// 	res.json(plant);
	// });
});

app.listen(PORT, console.log(`Server running`));