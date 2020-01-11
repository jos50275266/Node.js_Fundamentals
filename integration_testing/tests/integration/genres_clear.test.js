const request = require('supertest');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const mongoose = require('mongoose')

let server;

describe('/api/genres', () => {

    // like trigger call this function before each test
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        server.close();
        // 매번 test 할 때 마다 추가됨으로 항상 마지막에 제거 코드 추가
        await Genre.remove({})
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])

            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200); // Too generic
            expect(res.body.length).toBe(2); // little bit generic
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
        });
    });

    describe('Get /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);

        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        })
    });


    describe('POST /', () => {


        // Define the happy path, and then in each test, we change
        // one parameter that clearly alings with the name of the
        // test.

        let token;
        let name;

        // refactor #1
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1'
        })


        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400(Bad Request) if genre is invalid (less than 5 characters', async () => {
            name = '1234'

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
            // 이 테스트를 통해 validateGenre 에서 max(50)을 빼먹었음을 알 수 있다.
        })

        it('should save the genre if it is valid', async () => {
            await exec();

            const genre = await Genre.find({ name: 'genre1' })

            expect(genre).not.toBeNull();
        })

        it('should return the genre if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        })
    });
});
