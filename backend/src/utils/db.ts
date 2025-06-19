import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";

class ExtendedPrismaClient extends PrismaClient {
  private _mongoClient: MongoClient | null = null;

  constructor() {
    super();
  }

  $connection() {
    if (!this._mongoClient) {
      // @ts-ignore
      this._mongoClient = this._engine.client;
    }
    return this._mongoClient;
  }
}

const prisma = new ExtendedPrismaClient();

export default prisma;
