// Get all the published courses that are $15 or more, or have the word 'by' in their title.
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
    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();