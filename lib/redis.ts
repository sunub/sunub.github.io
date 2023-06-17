import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Car extends Entity {}
let schema = new Schema(
  Car,
  {
    make: { type: "string" },
    model: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);
export async function createCar(data: string) {
  await connect();

  const repository = client.fetchRepository(schema);

  const car = repository.createEntity(JSON.parse(data));

  const id = await repository.save(car);
  return id;
}
