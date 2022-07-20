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

// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, { 'Content-Type': 'text/plain' })
// //   response.end('Hello World')
// // })

app.get("/mylist", async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).send(plants);
     } catch (err) {
        console.log(err);
        res.status(500).send();
     }
    })
        // var data = JSON.stringify({
        //     "collection": "plants",
        //     "database": "test",
        //     "dataSource": "Cluster0",
        //     "projection": {
        //         "name": "strawberry"
        //     }
        // });
                    
        // var config = {
        //     method: 'get',
        //     url: 'https://data.mongodb-api.com/app/data-dvppi/endpoint/data/v1/action/findOne',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Request-Headers': '*',
        //     'api-key': process.env.MONGO_API,
        //     },
        //     data: data
        // };
                    
        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        // })

app.post("/addplant", async (req, res) => {

    const {name, lastWatered, daysBtwWatering, notes} = req.body;

    
    const newPlant = await Plant.create({
        name,
        lastWatered,
        daysBtwWatering,
        notes,
    }); 
    
    console.log(newPlant);

    // if(newPlant){
    //     res.status(201).json({
    //         name: newPlant.name,
    //         _id: newPlant._id

    //     })
    // } else {((e) => console.log(e))}

	// let newPlant = new Plant(req.body);

	newPlant.save((err, plant) => {
		if (err) {
			res.send(err);
		}
		res.json(plant);
	});
});

app.listen(PORT, console.log(`Server running`));