const moment = require('moment');
const request = require('supertest');
const { Movie } = require('../../models/movie');
const { User } = require('../../models/user');
const { Rental } = require('../../models/rental')
const mongoose = require('mongoose');


// POST /api/returns {customerId, movieId}

// Negative Cases
//Test Case #1. Return 401 if client in not logged in.
//Test Case #2. Return 400 if customerId is not provided.
//Test Case #3. Return 400 if movieId is not provided
//Test Case #4. Return 404 if no rental found for this customer/movie
//Test Case #5. Return 400 if rental already processed

// Positive Cases
// Test Case #1. Set the return  date
// Test Case #2. Calculate the rental fee (numberOfDays * movie.dailyRentalRate)
// Test Case #3. Increase the stock
// Test Case #4. Return the rental

// Test Cases - Let's Brainstorm

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let movie;
    let token;

    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });

    };

    beforeEach(async () => {
        server = require('../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '12345' },
            numberInStock: 10
        });

        await movie.save();

        // DateOut will be automatically set by mongoose.
        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        })
        await rental.save();
    });

    afterEach(async () => {
        await server.close();
        await Rental.deleteMany({});
        await Movie.deleteMany({});
    });


    // One simple Test
    it('should work!', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });

    it('should return 401 (Unauthorized) if client is not logged in!', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 (Bad Request) if customerId is not provided!', async () => {
        customerId = '';
        // delete payload.customerId;
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 (Bad Request) if movidId is not provided!', async () => {
        movieId = '';

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 (Not Found) if no rental found for this customer/movie', async () => {
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);
    });
    
    it('should return 400 (Bad Request) if rental already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400)
    });

    it('should return 200 if we have a valid request', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should set the returnDate if input is valid', async () => {
        const res = await exec();
        // 위 res = await exec()가 실행되고 DB에 변화가 발생해도
        // 아래 rentalInDB는 그 변화를 인식하지못한다. 그러므로, 우리는 아래와 같이
        // reload의 과정이 필요하다.
        const rentalInDB = await Rental.findById(rental._id)
        // 시간차가 있다는 것은 변화가 DB에 적용됬음을 의미하고 아래 시간은 WORST CASE
        // 즉 변화가 적용되었다면 당연히 시간차가 있어야하기 때문에.
        const diff = new Date() - rentalInDB.dateReturned;
        expect(diff).toBeLessThan(10 * 1000); // Worst Case
        // expect(rentalInDB.dateReturned).toBeDefined(); // general way
    });

    it('should set the rentalFee if input is valid', async () => {
        // dateOut (current time)
        rental.dateOut = moment().add(-7, 'days').toDate(); // 7 days ago
        await rental.save();

        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id);
        expect(rentalInDb.rentalFee).toBe(14);
    });

    it('should increase the movie stock if input is valid ', async () => {
        const res = await exec();
        // const res = await exec() 가 실행되면 결국에 returns.js 전체가 한 번 실행되고 난 후기
        // 때문에 +1 이 반영된다 이래서 비동기 방식을 이용한다.
        // 이제 조금 비동기의 느낌을 알 것 같다.
        const movieInDb = await Movie.findById(movieId);
        expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
    });

    it('should return the rental if input is valid', async () => {
        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        expect(res.body).toHaveProperty('dateOut');
        expect(res.body).toHaveProperty('dateReturned');
        expect(res.body).toHaveProperty('rentalFee');
        expect(res.body).toHaveProperty('customer');
        expect(res.body).toHaveProperty('movie');

        // 위 아래 동일
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie']))
    })
});