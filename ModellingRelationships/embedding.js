const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    } // Embedding Docs
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // Querying first and update approach
    // const course = await Course.findById(courseId);
    // course.author.name = 'Yongsu Jeong';
    // course.save();

    // We can update sub-document directly instead of querying it first like the above
    // We can update directly in database
    const course = await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'John Smith'
        }
    })
}

// In order to remove sub-document in database, we can use unset operator
async function removeAuthor(courseId) {
    const course = await Course.updateOne({ _id: courseId }, {
        $unset: {
            'author': ''
        }
    })
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
// updateAuthor('5e1343126f8c12530c650be0');
removeAuthor('5e1343126f8c12530c650be0');