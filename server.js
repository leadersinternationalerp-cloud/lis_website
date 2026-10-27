/**
 * Leaders International School — cPanel Node.js Application Entry Point
 *
 * In cPanel -> "Setup Node.js App":
 *   - Application mode: Production
 *   - Application startup file: server.js
 */
const { createServer } = require("node:http");
const { parse } = require("node:url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  }).listen(port, () => {
    console.log(`> Leaders International School ready on http://${hostname}:${port}`);
  });
});
