//Blocking synchronous
// const fs = require("fs");

// read file input.txt
// const data = fs.readFileSync("readfile/myfile/input.txt", "utf-8");
// console.log(data);

// // Write file
// const outputText = `Hello Node.js\n${data}\n File has written ${new Date()}`;
// fs.writeFileSync("readfile/myfile/output.txt", outputText);
// console.log("Writting already");

//non-Blocking Asynchronous
const fs = require("fs");
//read file input.txt
fs.readFile("readfile/myfile/input.txt", "utf-8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
  const outputText = `Hello Node.js\n${data} \n Fild has written when ${new Date()}`;
  fs.writeFile("readfile/myfile/output.txt", outputText, (err) => {
    if (err) return console.log("Err : ", err);
    console.log("End program");
  });
});

// fs.writeFile("readfile/myfile/input.txt");

console.log("End program");
