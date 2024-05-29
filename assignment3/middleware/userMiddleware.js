const { mockUsers } = require("../models/userModel");

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
module.exports = { resolveIndexByUserId };
