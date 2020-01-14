const request = require('supertest');
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
// Test Case #2. Calculate the rental fee
// Test Case #3. Increase the stock
// Test Case #4. Return the rental

// Test Cases - Let's Brainstorm

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
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
        await Rental.remove({})
    });


    // One simple Test
    it('should work!', async () => {
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
    });

    it('should return 401 if client is not logged in!', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided!', async () => {
        customerId = '';
        // delete payload.customerId;
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 if movidId is not provided!', async () => {
        movieId = '';

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for this customer/movie', async () => {
        
    })
});