const schema = {
  name: {
    type: "string",
    description: "name",
    example: "seco",
  },
  email: {
    type: "string",
    description: "email",
    example: "seco@email.com",
  },
  address: {
    type: "object",
    description: "address",
    example: "{}",
  },
};

const params = [
  {
    in: "header",
    name: "Authorization",
    required: true,
    schema: {
      type: "string",
    },
    description: "Authentication token",
  },
];

const paramsId = [
  {
    in: "path",
    name: "id",
    schema: {
      type: "string",
    },
    required: true,
    description: "user id",
  },
];

const requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: schema,
      },
      required: ["name", "email", "address"],
    },
  },
};

const responsePost = {
  201: {
    description: "user created successfully",
    content: {
      "aplication/json": {
        schema: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "user created successfully",
            },
          },
        },
      },
    },
  },
};

const responseGet = {
  200: {
    description: "get user successfully",
    content: {
      "aplication/json": {
        schema: {
          type: "object",
          properties: schema,
        },
      },
    },
  },
};

const responseDelete = {
  200: {
    description: "delete user successfully",
    content: {
      "aplication/json": {
        schema: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "delete user succesfully",
            },
          },
        },
      },
    },
  },
};

const userDocs = {
  post: {
    summary: "create new user",
    description: "Endpoint to create new user",
    tags: ["User"],
    requestBody: requestBody,
    responses: responsePost,
  },
  get: {
    summary: "get all user",
    description: "Endpoint to get all user",
    tags: ["User"],
    responses: responseGet,
  },
};

const userDocsParam = {
  get: {
    summary: "get one user",
    description: "Endpoint to get one user",
    tags: ["User"],
    parameters: paramsId,
    responses: responseGet,
  },
  patch: {
    summary: "update user by id",
    description: "Endpoint to update user",
    tags: ["User"],
    parameters: paramsId,
    requestBody: requestBody,
    responses: responsePost,
  },
  delete: {
    summary: "delete user by id",
    description: "Endpoint to delet user",
    tags: ["User"],
    parameters: paramsId,
    responses: responseDelete,
  },
};

module.exports = { userDocs, userDocsParam };
