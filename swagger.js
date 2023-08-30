const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'RESTfulAPI-nodeJS',
    description: 'API com tema de pedidos',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/models/routes'];

swaggerAutogen(outputFile, endpointsFiles, doc);