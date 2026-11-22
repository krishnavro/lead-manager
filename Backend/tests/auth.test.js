require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
let mongoServer;


describe('Authentication Api Test', ()=> {
    beforeAll(async ()=> {
        mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    },120000);
    afterAll(async ()=>{
        await mongoose.disconnect();
        await mongoServer.stop();
    })
    test('Register a new user', async ()=> {
        const response = await request(app)
        .post('/api/auth/register'
        ).send({
             name: 'Test User',
                email: 'testuser@gmail.com',
                phone: '9876543210',
                password: 'Test123'
        });
        expect(response.statusCode).toBe(201);
    });
    test('Login existing user', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'testuser@gmail.com',
            password: 'Test123'
        });
        
    expect(response.statusCode).toBe(200);
});
});