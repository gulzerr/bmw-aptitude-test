import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.DATABASE_URL || "mongodb://localhost:27017/bmw-aptitude-test";

interface ElectricCarData {
  Brand: string;
  Model: string;
  AccelSec: string;
  TopSpeed_KmH: string;
  Range_Km: string;
  Efficiency_WhKm: string;
  FastCharge_KmH: string;
  RapidCharge: string;
  PowerTrain: string;
  PlugType: string;
  BodyStyle: string;
  Segment: string;
  Seats: string;
  PriceEuro: string;
  Date: string;
}

async function parseDate(dateStr: string): Promise<Date> {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(2000 + year, month - 1, day);
}

async function migrateData() {
  let client: MongoClient | null = null;

  try {
    console.log("Starting data migration...");

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const collection = db.collection("ElectricCars");

    const csvFilePath = path.join(
      __dirname,
      "BMW_Aptitude_Test_Test_Data_ElectricCarData.csv"
    );

    const electricCars: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", async (data: ElectricCarData) => {
          try {
            // Transform the data to match our schema
            const electricCar = {
              brand: data.Brand.trim(),
              model: data.Model.trim(),
              accelSec: parseFloat(data.AccelSec),
              topSpeedKmH: parseInt(data.TopSpeed_KmH),
              rangeKm: parseInt(data.Range_Km),
              efficiencyWhKm: parseFloat(data.Efficiency_WhKm),
              fastChargeKmH:
                data.FastCharge_KmH !== "-"
                  ? parseFloat(data.FastCharge_KmH)
                  : null,
              rapidCharge: data.RapidCharge === "Yes",
              powerTrain: data.PowerTrain,
              plugType: data.PlugType,
              bodyStyle: data.BodyStyle,
              segment: data.Segment,
              seats: parseInt(data.Seats),
              priceEuro: parseFloat(data.PriceEuro),
              releaseDate: await parseDate(data.Date),
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            electricCars.push(electricCar);
          } catch (error) {
            console.error("Error processing row:", data);
            console.error(error);
          }
        })
        .on("end", () => {
          console.log(
            `CSV file successfully processed. Found ${electricCars.length} records.`
          );
          resolve();
        })
        .on("error", (error: Error) => {
          reject(error);
        });
    });

    console.log("Inserting data into MongoDB...");

    // Check if data exists
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} records. Skipping insertion.`);
    } else {
      console.log("Database is empty. Proceeding with data insertion.");

      const batchSize = 20;
      let insertedCount = 0;

      for (let i = 0; i < electricCars.length; i += batchSize) {
        const batch = electricCars.slice(i, i + batchSize);
        try {
          const result = await collection.insertMany(batch);
          insertedCount += result.insertedCount;
          console.log(
            `Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
              electricCars.length / batchSize
            )}`
          );
        } catch (error) {
          console.error(
            `Failed to insert batch ${Math.floor(i / batchSize) + 1}:`,
            error
          );
        }
      }

      console.log(
        `Successfully inserted ${insertedCount}/${electricCars.length} records`
      );
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during data migration:", error);
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}

migrateData().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
