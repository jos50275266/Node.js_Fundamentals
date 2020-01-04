const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Su',
        tags: ['React', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Su', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}


async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: true
        }
    }, { new: true });
    console.log(course)
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    // Course.deleteOne({isPublished: false})
    const course = await Course.findByIdAndRemove({ _id: id })
    console.log(result);
    console.log(course)
}

async function removeMultiCourses(condition) {
    // const result = await Course.deleteMany({ condition })
}

removeCourse('5e10ae03a9d1160317532e5a')