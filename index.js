const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()} `;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(`File has been written`);

// Non blocking way

// console.log(`One`);
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     // console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       const toni = data2 + data3;
//       fs.writeFile("./txt/final.txt", toni, "utf-8", (err, _) => {
//         console.log(`File has been written`);
//       });
//     });
//   });
// });

// console.log(`Will read file`);

//sERVER
// const toni = fs.readFile(`${__dirname}/dev-data/data.json`);
let toni;

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;
  if (pathName === "/overview" || pathName === "/") {
    res.end("Hi this is overview");
  } else if (pathName === "/product") {
    res.end("This is product");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }

  // res.end("Hi I am a server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Server is running`);
});
