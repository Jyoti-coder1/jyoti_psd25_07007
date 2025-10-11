let getUserInfo = (user) => {
  let id = user.id;
  let name = user.profile?.name || "Information not available";
  let city = user.profile?.address?.city || "Information not available";
  let zipcode = user.profile?.address?.zipcode || "Information not available";
  console.log("User " + name + " (ID: " + id + ") lives in " + city + " (ZIP: " + zipcode + ")");
};
let user1 = {
  id: 123,
  profile: {
    name: "John Doe",
    address: {
      city: "Los Angeles",
      zipcode: "90001"
    }
  }
};

let user2 = {
  id: 123,
  profile: {
    name: "John Doe"
  }
};
getUserInfo(user1);
getUserInfo(user2);