const express = require("express");
const app = express();
const Port = process.env.Port || 3000;
const userRoute = require("./routes/users");
const productRoute = require("./routes/product");

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});
app.use(express.json());

app.use("/api", userRoute);
app.use("/api", productRoute);

app.listen(Port, () => {
  console.log(`Running on Port ${Port}`);
});
