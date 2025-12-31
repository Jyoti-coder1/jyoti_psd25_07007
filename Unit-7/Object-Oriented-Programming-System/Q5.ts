class User {
    public name: string;
    private orgCode: string = "DuckCorp";
    protected role: string;

    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
    }

    introduce(): void {
        console.log(`I am ${this.name} from ${this.orgCode}`);
    }
}

class Manager extends User {
    constructor(name: string) {
        super(name, "Manager");
    }

    getRole(): void {
        console.log(this.role);
    }
}

// Instantiate User
const user = new User("Daffy", "Employee");
user.introduce();

// Instantiate Manager
const manager = new Manager("Donald");
manager.getRole();

// Compile-time Error (private)
// console.log(user.orgCode);