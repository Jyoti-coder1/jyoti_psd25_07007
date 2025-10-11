function fetchData(forceSuccess = null) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success;
            if(forceSuccess === null) {
                success = Math.random() > 0.5;
            }
            else {
                success = forceSuccess;
            }
            if (success) {
                resolve("Data received successfully!");
            }
            else {
                reject("Server error occurred.");
            }
        }, 1000);
    });
}
async function fetchDataHandler(forceSuccess = null) {
    try {
        const result = await fetchData(forceSuccess);
        console.log("Fetched data successfully!", result);
    }
    catch (error) {
        console.log("Error fetching data:", error);
    }
}
fetchDataHandler(true);
fetchDataHandler(false);