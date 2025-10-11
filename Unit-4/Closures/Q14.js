function createFunctionList() {
  var functions = [];
  for (var i = 0; i < 5; i++) {
    functions.push(function () {
      console.log("Index:", i);
    });
  }
  return functions;
}
const functionList = createFunctionList();
for (let j = 0; j < functionList.length; j++) {
  console.log(`Expected Output: "Index: ${j}", Actual Output:`, `"Index:",`); 
  functionList[j]();
}