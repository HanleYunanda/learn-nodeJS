// getting-started.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Durian",
    rating: 1,
    review: "Pretty Solid as a fruit"
})

// fruit.save();

Fruit.find({})
    .then((documents) => {
        mongoose.connection.close();
        console.log('Data : ', documents);
    })
    .catch((err) => {
        console.error(err);
    });