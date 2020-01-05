const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));


// enum, minlength, maxlength, min, max, required: function()
const courseSchema = new mongoose.Schema({
    // 아래와 같은 schema 정의 방식은 only mongoose만 알고있다, mongoDB는 알지 못한다.
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
        // 카테고리는 반드시 아래 중 하나여야 한다.
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // required에도 함수로 조건을 줄 수 있다.
        // 아래 required 부분의 함수의 경우 arrow function의 사용이 불가하다.
        // 왜냐하면 arrow function은 their own this를 가지지 않기 때문이다.
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
        tags: ['Node', 'Backend'],
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