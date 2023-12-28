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
    name: "Pineapple",
    rating: 5,
    review: "It's good"
})

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Any",
    age: 12,
    favouriteFruit: fruit
});

// person.save();

// Fruit.find({})
//     .then((documents) => {
//         mongoose.connection.close();
//         console.log(documents.length);
//         console.log(documents);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// Person.find({})
//     .then((documents) => {
//         mongoose.connection.close();
//         console.log(documents.length);
//         console.log(documents);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

Fruit.findById("658c34499ffc7f390b028560").exec()
    .then(async (res) => {
        const updated = await Person.updateOne({name: "John"}, {favouriteFruit: res});
        console.log(updated.acknowledged);
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });