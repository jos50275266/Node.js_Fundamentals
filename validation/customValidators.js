const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

/*
Custom Validators

tags: {
    type: Array,
    validate: {
        validator: function(v) {
            return v && v.length > 0
        },
        message: "오류가 났을때 출력"
    }
}

*/
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
    // tags: [String],
    tags: {
        type: Array,
        // custom validators
        validate: {
            // v = value
            validator: function (v) {
                return v && v.length > 0;
                // null을 허용하지 않기 위해.
            },
            message: 'A course should have at least one tag.'
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
        category: 'web',
        author: 'Su',
        tags: [],
        isPublished: true
    })

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}

createCourse();