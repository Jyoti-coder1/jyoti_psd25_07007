let user = {
  username: "jyoti_maan",
  showUsername: function() {
    console.log("Inside Method:", this.username);
  }
};
function printUsername() {
  console.log("Inside Regular Function:", this.username);
}
user.showUsername();
printUsername();
