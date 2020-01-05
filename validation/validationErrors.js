const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,

    // New Async Version
    tags: {
        type: Array,
        validate: {
            validator: (v) => Promise.resolve((v) && (v.length > 0)),
            message: 'A course should have at least one tag!'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node Course', // req.body.name
        category: '-',
        author: 'Su',
        tags: null,
        isPublished: true,
        price: 30
    })

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        // ex.errors.tags, ex.errors.category ...
        // console.log(ex.errors)
        // errors가 true인 경우에만
        for (field in ex.errors) {
            // console.log(ex.errors[field]);
            console.log(ex.errors[field].message)
        }
    }
}

createCourse();