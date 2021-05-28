require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT || "8080";
const redirectQuery = process.env.REDIRECT_QUERY || "redirect";
const errorCode = process.env.REDIRECT_MISSING_ERROR || "404";
const logLevel = process.env.LOG_LEVEL || "error"; // info -> error ->  debug,

app.listen(port, () => {
  console.info(`Redirect server started at port ${port}`);
  console.info(process.env)
});

app.get("/", (req, res) => {
  const redirect = req.query[redirectQuery];
  if (!redirect) {
    if (["info", "error", "debug"].includes(logLevel)) console.error("[error] missing query:", redirectQuery);
    res.status(errorCode).send("missing redirect query");
  } else {
    if (["info", "error"].includes(logLevel)) console.log("[debug] redirect to ", redirect);
    res.redirect(redirect);
  }
});
