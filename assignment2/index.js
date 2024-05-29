const express = require("express");
const app = express();
const Port = process.env.Port || 3000;
const userRoute = require("./routes/users");
const productRoute = require("./routes/product");
app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

app.use(express.json());

// const mockUsers = [
//   { id: 1, userName: "anson", displayName: "Anson" },
//   { id: 2, userName: "jack", displayName: "Jack" },
//   { id: 3, userName: "adam", displayName: "Adam" },
//   { id: 4, userName: "rohan", displayName: "Rohan" },
//   { id: 5, userName: "johny", displayName: "Johny" },
//   { id: 6, userName: "alpha", displayName: "Alpha" },
//   { id: 7, userName: "beta", displayName: "Beta" },
// ];

app.use("/api", userRoute);

app.use("/api", productRoute);

// app.get("/api", userRoute);

// app.get("/api", productRoute);

// app.post("/api", userRoute);

// app.put("/api", userRoute);

// app.delete("/api", userRoute);

// app.get("/api", userRoute);

app.listen(Port, () => {
  console.log(`Running on Port ${Port}`);
});
