const fs = require("fs");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  //   console.log(req.url, req.method, req.headers);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      "<body><form action='/message' method = 'POST'><input type='text' name = 'message'/><button type ='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    // parsing/reading the incoming data
    const body = [];
    // registering an event listener
    req.on("data", (chunkData) => {
      body.push(chunkData);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      fs.writeFile("message.txt", data, (error) => {
        // redirecting the page here
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello From Node JS Server !</h1></body>");
  res.write("</html>");
  res.end();
  // to exit the server
  //   process.exit();
};

// exporting the file
module.exports = routesHandler;
