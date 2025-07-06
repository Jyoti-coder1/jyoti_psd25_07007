function startTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task A completed");
        }, 1000);
    });
}
function processTask(taskAResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Task B processed: ${taskAResult}`);
        }, 1500);
    });
}
function finalizeTask(taskBResult) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Final result: ${taskBResult}`);
        }, 500);
    });
}
startTask()
    .then((resultA) => {
        console.log(resultA);
        console.log("(1 second delay)");
        return processTask(resultA);
    })
    .then((resultB) => {
        console.log(resultB);
        console.log("(1.5 second delay)");
        return finalizeTask(resultB);
    })
    .then((finalResult) => {
        console.log(finalResult);
    })
    .catch((error) => {
        console.error("Error occurred:", error);
    });