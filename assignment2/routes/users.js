const express = require("express");
const router = express.Router();

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


router.get("/users", (request, response) => {
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

router.post("/users", (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  };
  mockUsers.push(newUser);
  return response.status(201).send(mockUsers);
});

router.put("/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

router.get("/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

module.exports = router;
