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
    review: "Bad fruit with a very strong smell"
})

// fruit.save();

Fruit.updateOne({_id: "658d1d0dfd3a9ceab84e5d23"}, {name: "Durian Updated"})
    .then((res) => {
        mongoose.connection.close();
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

Fruit.deleteOne({_id: "658d1d0dfd3a9ceab84e5d23"})
    .then((res) => {
        mongoose.connection.close();
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

Fruit.find({})
    .then((res) => {
        mongoose.connection.close();
        console.log(res.length);
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });