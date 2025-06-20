import prisma from "../../utils/db";

const selectFields = {
  brand: true,
  model: true,
  accelSec: true,
  topSpeedKmH: true,
  efficiencyWhKm: true,
  rangeKm: true,
  fastChargeKmH: true,
  rapidCharge: true,
  powerTrain: true,
  plugType: true,
  bodyStyle: true,
  segment: true,
  seats: true,
  priceEuro: true,
  releaseDate: true,
};

export async function fetchElectriCars(opts: { keyword?: string }) {
  const { keyword } = opts;

  const where: any = {
    status: "active",
  };

  if (keyword) {
    where.AND = [
      { status: "active" },
      {
        OR: [
          { brand: { contains: keyword, mode: "insensitive" } },
          { model: { contains: keyword, mode: "insensitive" } },
        ],
      },
    ];
  }

  const cars = await prisma.electricCars.findMany({
    where,
    select: selectFields,
  });

  return cars;
}

export async function filterElectriCars(opts: {
  column: string;
  criteria: string;
  value?: string;
}) {
  const { column, criteria, value } = opts;

  const where: any = {
    status: "active",
  };

  switch (criteria) {
    case "contains":
      if (value) {
        where[column] = { contains: value, mode: "insensitive" };
      }
      break;

    case "equals":
      if (value) {
        where[column] = { equals: value, mode: "insensitive" };
      }
      break;

    case "starts_with":
      if (value) {
        where[column] = { startsWith: value, mode: "insensitive" };
      }
      break;

    case "ends_with":
      if (value) {
        where[column] = { endsWith: value, mode: "insensitive" };
      }
      break;

    case "is_empty":
      where[column] = null;
      break;

    default:
      throw new Error(`Unsupported criteria: ${criteria}`);
  }
  console.log(where);
  const cars = await prisma.electricCars.findMany({
    where,
    select: selectFields,
  });

  return cars;
}

export async function deleteElectricCar(opts: { id: string }) {
  const { id } = opts;

  await prisma.electricCars.update({
    where: {
      id,
    },
    data: {
      status: "deleted",
    },
  });
  return "Electric car deleted successfully";
}
