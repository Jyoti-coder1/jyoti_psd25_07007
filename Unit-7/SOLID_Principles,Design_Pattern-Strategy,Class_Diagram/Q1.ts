class TaskManager {
    createTask(name: string): void {
        console.log(`Creating task: ${name}`);
    }
}

class EmailService {
    sendEmail(to: string): void {
        console.log(`Sending email to ${to}`);
    }
}

// Usage
const taskManager = new TaskManager();
taskManager.createTask("Complete SRP Assignment");

const emailService = new EmailService();
emailService.sendEmail("admin@company.com");