const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Todo = require("../src/models/Todo");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../src/config");

async function createUserAndToken(email = "test@example.com") {
    const user = new User({ name: "Test", email, password: "password" });
    await user.save();
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "1d" });
    return { user, token };
}

describe("Todos integration", () => {
    test("Create todo (with valid token)", async () => {
        const { token } = await createUserAndToken("create@example.com");
        const res = await request(app)
            .post("/todos")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "Buy milk", description: "2 liters", status: "pending" });

        expect(res.status).toBe(201);
        expect(res.body.title).toBe("Buy milk");
        expect(res.body.user).toBeDefined();
    });

    test("Get all todos for logged-in user", async () => {
        const { user, token } = await createUserAndToken("get@example.com");
        await Todo.create({ title: "A", user: user._id });
        await Todo.create({ title: "B", user: user._id });

        const res = await request(app).get("/todos").set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty("title");
    });

    test("Update a specific todo (only owner can update)", async () => {
        const { user, token } = await createUserAndToken("owner@example.com");
        const todo = await Todo.create({ title: "Old", user: user._id });

        const res = await request(app)
            .put(`/todos/${todo._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "New" });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe("New");
    });

    test("Delete a specific todo (owner only)", async () => {
        const { user, token } = await createUserAndToken("del@example.com");
        const todo = await Todo.create({ title: "ToDelete", user: user._id });

        const res = await request(app).delete(`/todos/${todo._id}`).set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Deleted");
    });

    test("Access fails for unauthenticated user", async () => {
        const res = await request(app).post("/todos").send({ title: "shouldfail" });
        expect(res.status).toBe(401);
    });

    test("Access fails if trying to update other's todo", async () => {
        const { user: owner } = await createUserAndToken("owner2@example.com");
        const { token: otherToken } = await createUserAndToken("other@example.com");

        const todo = await Todo.create({ title: "OwnerTodo", user: owner._id });

        const res = await request(app)
            .put(`/todos/${todo._id}`)
            .set("Authorization", `Bearer ${otherToken}`)
            .send({ title: "Hacked" });

        expect(res.status).toBe(403);
    });

    test("Access fails if trying to delete other's todo", async () => {
        const { user: owner } = await createUserAndToken("owner3@example.com");
        const { token: otherToken } = await createUserAndToken("other2@example.com");

        const todo = await Todo.create({ title: "OwnerTodo2", user: owner._id });

        const res = await request(app).delete(`/todos/${todo._id}`).set("Authorization", `Bearer ${otherToken}`);
        expect(res.status).toBe(403);
    });
});