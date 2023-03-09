import swaggetJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from '../config.js';

const options = {
	definition: {
		openapi: config.swagger.apiVersion,
		info: {
			title: 'TodoList API Docs',
			version: '1.0.0',
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: config.swagger.auth.type,
					scheme: config.swagger.auth.scheme,
					bearerFormat: config.swagger.auth.format,
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['./router/user.js', '../schema/*.js'],
};

const swaggerSpec = swaggetJsdoc(options);

const swaggerDocs = (app) => {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('docs.json', (request, response) => {
		response.setHeader('Content-Type', 'application/json');
		response.send(swaggerSpec);
	});
};

export default swaggerDocs;
