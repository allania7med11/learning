const dotenv = require("dotenv");
if (process.env.NODE_ENV === "production") {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.dev" });
}
require("dotenv").config();
const app = require('./app');
const sequelize = require('./sequelize');
const PORT = 8000;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	console.log(`Starting Sequelize + Express  on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}.`);
	});
}

init();
