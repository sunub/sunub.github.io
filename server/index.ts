import { MongoClient, OptionalId } from "mongodb";
import uri from "./atlas_uri.ts";

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

		await findListing(client, {
			minimumNumberOfBathrooms: 4,
			minimumNumberOfBedrooms: 2,
			maximumNumberOfResults: 5,
		});
	} catch (err) {
		console.error(`Error connecting to the database: ${err}`);
	} finally {
		await client.close();
	}
};
