const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));


const courseSchema = new mongoose.Schema({
    // 아래와 같은 schema 정의 방식은 only mongoose만 알고있다, mongoDB는 알지 못한다.
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course', // req.body.name
        author: 'Su',
        tags: ['Angular', 'Frontend'],
        isPublished: true,
        price: 15
    })

    // async/await은 catch 사용이 불가하기 때문에, 대신에 try/catch 문을 사용
    try {
        // Manual Validation
        // 이 방식이 좋지 않은 이유는 validate() method는 결과로 promise / void 를 제외하고
        // 별도의 boolean 값을 return 해주지 않기 때문에 if(!isvalid)와 같은 조건문 사용이 불가하다
        // 대신에 callback based approcah를 이용할 수 있다.
        // course.validate((err) => {
        //     if(err) {

        //     }
        // });

        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        // ex = exception
        console.log(ex.message);
    }
}

createCourse();