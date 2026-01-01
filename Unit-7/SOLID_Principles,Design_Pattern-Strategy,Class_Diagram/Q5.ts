// Step 1: Database Interface (Abstraction)
interface Database {
    save(data: string): void;
}

// Step 2: Low-level implementations
class MySQLService implements Database {
    save(data: string): void {
        console.log("Saving to MySQL:", data);
    }
}

class MongoDBService implements Database {
    save(data: string): void {
        console.log("Saving to MongoDB:", data);
    }
}

// Step 3: High-level module depends on abstraction
class UserService {
    constructor(private db: Database) { }

    register(user: string): void {
        this.db.save(user);
    }
}

// Step 4: Usage (Dependency Injection)
const mysql = new MySQLService();
const userService1 = new UserService(mysql);
userService1.register("John Doe");

const mongo = new MongoDBService();
const userService2 = new UserService(mongo);
userService2.register("Jane Doe");