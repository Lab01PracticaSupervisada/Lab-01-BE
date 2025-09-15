import express from "express";

import usersRoute from "./routes/cursos.js"

const app = express();

const port = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.json({ok: true});
});

app.use(express.json());

app.use('/',usersRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;