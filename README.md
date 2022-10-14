[Plantino](https://plantino.herokuapp.com/) is an application that remembers the watering schedule of your houseplants for you.


As an owner of currently 17 plants (geraniums, strawberry, oleander and many more), I struggle to keep up with the schedule of the watering. Some applications of course have already been developed for this purpose. However, the goal here was to practice my skills, especially when it comes to the backend — a full stack application seemed like a right challenge.


Plantino, therefore, is a full-stack application built with the MERN stack. It is a rather straightforward app that allows logged (or demo) users to manually enter all the necessary information about their (house)plant: its name, the date when it was last watered, the number of days between each watering and notes on keeping it healthy and thriving. Another element of the application is a plant recognition feature. It uses [Plant.id](https://web.plant.id/) API not only to list the suggestions from the uploaded picture but also to tell the actual probability that the uploaded picture is indeed a plant.


The application uses user authentication via [Passport.js](https://www.passportjs.org/) middleware that allows accessing the houseplants lists from everywhere. For the dates management, the app uses [Luxon](https://moment.github.io/luxon/).


