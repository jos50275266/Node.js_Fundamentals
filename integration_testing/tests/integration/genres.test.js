const request = require('supertest');
const { Genre, validateGenre } = require('../../models/genre');

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


});
