fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        console.log("User Names:");
        for (const user of users) {
            console.log(user.name);
        }
    })
    .catch(error => {
        console.error("Error fetching users:", error);
    });