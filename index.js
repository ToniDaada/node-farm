const fs = require("fs");
const url = require("url");
const http = require("http");

const replaceTemplate = require(`./module/replaceTemplate`);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((data, i) => {
        return replaceTemplate(tempCard, data);
      })
      .join("");

    const output = tempOverview.replaceAll("{%PRODUCTCARDS%}", cardsHtml);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const product = dataObj[query.id];
    if (product) {
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
    }

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    //NOT FOUND
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Server is running`);
});
