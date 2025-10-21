const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(done => {
    mongoose.connect(process.env.MONGO_URI, done);
});

afterAll(done => {
    mongoose.connection.close(done);
});

describe('Todo API', () => {
    it('should return API running', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({ title: 'Test Todo' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data.title).toBe('Test Todo');
    });

    it('should get all todos', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});