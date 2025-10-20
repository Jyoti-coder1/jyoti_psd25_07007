const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const { JWT_SECRET } = require("../src/config");
const jwt = require("jsonwebtoken");

describe("Auth integration", () => {
    test("User can signup", async () => {
        const res = await request(app).post("/auth/signup").send({
            name: "Alice",
            email: "alice@example.com",
            password: "password123"
        });
        expect(res.status).toBe(201);
        expect(res.body.email).toBe("alice@example.com");
    });

    test("User can login and receive JWT", async () => {
        const user = new User({ name: "Bob", email: "bob@example.com", password: "pass1234" });
        await user.save();

        const res = await request(app).post("/auth/login").send({
            email: "bob@example.com",
            password: "pass1234"
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();

        const decoded = jwt.verify(res.body.token, JWT_SECRET);
        expect(decoded.id).toEqual(user._id.toString());
    });

    test("Login fails for invalid credentials", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "noone@example.com",
            password: "wrong"
        });
        expect(res.status).toBe(400);
    });

    test("Accessing protected route without token fails", async () => {
        const res = await request(app).get("/todos");
        expect(res.status).toBe(401);
    });

    test("Accessing protected route with invalid token fails", async () => {
        const res = await request(app).get("/todos").set("Authorization", "Bearer invalidtoken");
        expect(res.status).toBe(401);
    });
});