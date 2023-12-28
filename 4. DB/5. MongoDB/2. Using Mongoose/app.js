// getting-started.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty Solid as a fruit"
})

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 20
});

// person.save();

const arrayOfFruits = [
    new Fruit({
        name: "Kiwi",
        rating: 5,
        review: "Not my favorite fruit"
    }),
    new Fruit({
        name: "Orange",
        rating: 9,
        review: "Refreshing fruit"
    }),
    new Fruit({
        name: "Watermelon",
        rating: 8,
        review: "Summer fruit"
    })
];

// Fruit.insertMany(arrayOfFruits);

Fruit.find({})
    .then((documents) => {
        mongoose.connection.close();
        console.log('Data : ', documents);
    })
    .catch((err) => {
        console.error(err);
    });