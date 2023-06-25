const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
  
require("dotenv").config();

const bodyParser = require("body-parser");
const app = express();

app.use(
  cors({
    origin: process.env.APP_URL
  })
);

app.use(bodyParser.json());

app.get("/getAccessToken", async (req, res) => {
  const code = req.query.code;

  const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.get("/getUserData", async (req, res) => {
  const accessToken = req.get("Authorization").split(" ")[1]; // Extract access token
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(4000, () => {
  console.log("CORS server running on port 4000");
});

// ----------------------------------Explanation of the above code------------------------------------

/* - cors is a middleware that enables Cross-Origin Resource Sharing, allowing requests from a different domain or port.
    const dotenv= require("dotenv");

 -  fetch is a module used for making HTTP requests in Node.js.
   The fetch function is used to send the POST request, passing the necessary parameters and headers.

  - body-parser is a middleware that parses the incoming request bodies.

  -  This middleware configures the application to parse JSON request bodies.

  - The route handles the OAuth authorization code received from the client and exchanges it for an access token by making a POST request to https://github.com/login/oauth/access_token.

  - the params variable is used to construct a query string that will be appended to the URL of the POST request made to https://github.com/login/oauth/access_token.

   - This defines a GET route /getUserData that expects the access token in the Authorization header of the request.
The access token is extracted from the header and used to make a GET request to https://api.github.com/user to fetch the user's data from the GitHub API.

 - This starts the server on port 4000 and logs a message to the console once the server is running.
 */
