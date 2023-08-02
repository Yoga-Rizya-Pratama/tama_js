const { userDocs, userDocsParam } = require("./example/user.docs");

const docs = {
  openapi: "3.0.0",
  info: {
    title: "My Api",
    description: "",
    version: "1.0.0",
    contact: {
      name: "Yoga Rizya Pratama",
      email: "yogarizya.pratama@gmail.com",
    },
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [
    {
      name: "User",
      description: "User Route",
    },
  ],
  paths: {
    "/user": userDocs,
    "/user/{id}": userDocsParam,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = docs;
