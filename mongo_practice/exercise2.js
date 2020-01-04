/*
Get all the published frontend and backend courses,
sort them by their price in a descending order,
pick only their name and auther,
and display them.
*/
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo--exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connecting to MongoDB');
    })
    .catch((err) => {
        console.log('Error occured', err);
    });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    // return await Course
    //     .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
    //     .sort({ price: -1 }) // or ('-price')
    //     .select({ name: 1, author: 1, price: 1 }) // select('name author price')

    return await Course
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, { tags: 'backend' }])
        .sort('-price')
        .select('name author price')
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run()