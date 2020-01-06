const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}))

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
        // Name of the target collection
        // Once again we don't really have a proper relationship here, we can store a course with a invalid author,
        // and Mongo doesn't complain about that.
    }
}));

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const course = await Course
        .find()
        .select({ name: 1 })

    console.log(course);
}

async function populateListCourses() {
    const course = await Course
        .find()
        .populate('author', 'name _id') // - : exclude
        .exec((err, result) => {
            if (err) return console.log('Error Occurred', err);
            console.log('The author is ', result)
        })

    // 만약 category collection도 reference로 존재하면
    const courses = await Course
        .find()
        .populate('author', 'name -_id')
        .populate('category', 'name')
        .select('name author')

    console.log(courses);

    // MongoDB는 SQL 처럼 Integrity가 없기 때문에 중간에 author _id 값이 변경되면
    // 그냥 null으로 출력함
}


// createAuthor('Su', 'My bio', 'My Website');
// createCourse('Nodejs', '5e12fff81dd8d417209550b3')
// listCourses() 
populateListCourses();