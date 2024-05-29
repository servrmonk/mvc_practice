import express from "express";
const app = express();
const Port = process.env.Port || 3000;

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

app.use(express.json());

const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);

  request.findUserIndex = findUserIndex;
  console.log("request.finduserindex== ", request.findUserIndex);
  next();
};

const mockUsers = [
  { id: 1, userName: "anson", displayName: "Anson" },
  { id: 2, userName: "jack", displayName: "Jack" },
  { id: 3, userName: "adam", displayName: "Adam" },
  { id: 4, userName: "rohan", displayName: "Rohan" },
  { id: 5, userName: "johny", displayName: "Johny" },
  { id: 6, userName: "alpha", displayName: "Alpha" },
  { id: 7, userName: "beta", displayName: "Beta" },
];
app.get("/api/users", (request, response) => {
  console.log("Request.query", request.query);
  const {
    query: { filter, value },
  } = request;
  if (!filter && !value) return response.send(mockUsers);
  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );

  response.send(mockUsers);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "Raushan", netWorth: "1bn" }]);
});

// for post
app.post("/api/users", (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  };
  mockUsers.push(newUser);
  return response.status(201).send(mockUsers);
});

app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  // mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }; //corrected
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  // mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };//corrected
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  // console.log("finduserindex value in app.get particular id ",findUserIndex);
  // const findUser = mockUsers.find((user) => user.id === findUserIndex);// Corrected user lookup logic
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.listen(Port, () => {
  console.log(`Running on Port ${Port}`);
});
