import { MongoClient } from "mongodb";
import uri from "./atlas_uri";

const client = new MongoClient(uri);
const dbname = "blogpost";

const connectToDatabase = async () => {
	try {
		await client.connect();
		console.log(`Connected to the ${dbname} database`);
	} catch (err) {
		console.error(`Error connectiong to the database: ${err}`);
	}
};

const main = async () => {
	try {
		await connectToDatabase();

		const database = client.db("sample_mflix");
		const movies = database.collection("movies");

		const query = { title: "Back to the Fucture" };
		const movie = await movies.findOne(query);

		console.log(movie);
	} catch (err) {
		console.error(`Error connecting to the database: ${err}`);
	} finally {
		await client.close();
	}
};

async function listDatabase(client: MongoClient) {
	const databaseList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databaseList.databases.forEach((db) => {
		console.log(`~ ${db.name}`);
	});
}

(async () => {
	await main();
	await listDatabase(client);
})();
