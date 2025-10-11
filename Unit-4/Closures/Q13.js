function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return balance;
      } else {
        return "Deposit amount must be positive.";
      }
    },
    withdraw(amount) {
      if (amount <= 0) {
        return "Withdraw amount must be positive.";
      }
      if (amount > balance) {
        return "Insufficient funds.";
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}
const account = createBankAccount(100);
console.log(account.deposit(50));
console.log(account.withdraw(30));
console.log(account.getBalance());