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

const parameters = [
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

const response = {
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

const userDocs = {
  post: {
    summary: "create new user",
    description: "Endpoint to create new user",
    tags: ["User"],
    requestBody: {
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
    },
    responses: response,
    parameters: parameters,
  },
};

module.exports = userDocs;
