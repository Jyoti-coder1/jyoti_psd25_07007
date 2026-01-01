// Interface Segregation Principle (ISP)

// Small, focused interfaces
interface Printer {
    print(): void;
}

interface Scanner {
    scan(): void;
}

interface Fax {
    fax(): void;
}

// OldPrinter can only print
class OldPrinter implements Printer {
    print(): void {
        console.log("Printing...");
    }
}

// SmartPrinter can print, scan, and fax
class SmartPrinter implements Printer, Scanner, Fax {
    print(): void {
        console.log("Printing...");
    }

    scan(): void {
        console.log("Scanning...");
    }

    fax(): void {
        console.log("Faxing...");
    }
}

// Usage
const oldPrinter = new OldPrinter();
oldPrinter.print();

const smartPrinter = new SmartPrinter();
smartPrinter.print();
smartPrinter.scan();
smartPrinter.fax();