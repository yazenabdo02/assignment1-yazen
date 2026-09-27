const express = require("express");
const pkg = require("../package.json");
const { getServices, countByStatus } = require("./services");

function createApp() {
  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/version", (req, res) => {
    res.json({ name: pkg.name, version: pkg.version });
  });

  app.get("/api/services", (req, res) => {
    const services = getServices();
    res.json({ services, summary: countByStatus(services) });
  });

  return app;
}

module.exports = { createApp };

