function bankAccount(initialBalance = 0) {
  let balance = initialBalance;
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`Deposited: $${amount}`);
      } else {
        console.log("Deposit amount must be positive.");
      }
    },
    withdraw: function(amount) {
      if (amount <= 0) {
        console.log("Withdrawal amount must be positive.");
      } else if (amount > balance) {
        console.log("Insufficient funds.");
      } else {
        balance -= amount;
        console.log(`Withdrew: $${amount}`);
      }
    },
    getBalance: function() {
      return balance;
    },
    reset: function() {
      balance = initialBalance;
      console.log("Account reset to initial balance.");
    }
  };
}
const myAccount = bankAccount(100);
myAccount.deposit(50);
myAccount.withdraw(30);
console.log(myAccount.getBalance());
myAccount.withdraw(200);
myAccount.reset();
console.log(myAccount.getBalance());