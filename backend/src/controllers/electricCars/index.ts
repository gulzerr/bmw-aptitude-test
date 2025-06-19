import bodyParser from "body-parser";
import { Router } from "ultimate-express";
import { celebrate, Joi } from "celebrate";
import {
  deleteElectricCar,
  fetchElectriCars,
  filterElectriCars,
} from "../../services/electricCars";

const router = Router();
// router.use(bodyParser.urlencoded({ extended: true }));

router.get(
  "/search",
  celebrate({
    query: {
      keyword: Joi.string().optional(),
    },
  }),
  async (req, res) => {
    try {
      const { keyword } = req.query as any;
      const data = await fetchElectriCars({ keyword });
      res.status(200).json({
        isError: false,
        data,
      });
    } catch (err) {
      const error = err as Error;
      res.json({
        isError: true,
        body: {
          message: error.message,
        },
      });
    }
  }
);

router.get(
  "/filter",
  celebrate({
    query: {
      column: Joi.string().required(),
      criteria: Joi.string()
        .valid("contains", "equals", "starts_with", "ends_with", "is_empty")
        .required(),
      value: Joi.string().optional(),
    },
  }),
  async (req, res) => {
    try {
      const { column, criteria, value } = req.query as any;
      if (
        (column === "model" || column === "brand") &&
        criteria === "is_empty"
      ) {
        throw new Error(
          "The 'model' or 'brand' cannot be empty when filtering."
        );
      }
      const data = await filterElectriCars({ column, criteria, value });
      res.status(200).json({
        isError: false,
        data,
      });
    } catch (err) {
      const error = err as Error;
      console.error("Error filtering electric cars:", error);
      res.json({
        isError: true,
        body: {
          message: error.message,
        },
      });
    }
  }
);

router.delete(
  "/delete/:id",
  celebrate({
    params: {
      id: Joi.string().required(),
    },
  }),
  async (req, res) => {
    try {
      const { id } = req.params as any;
      await deleteElectricCar({ id });
      res.status(200).json({
        isError: false,
        body: { message: "Electric car deleted successfully" },
      });
    } catch (err) {
      const error = err as Error;
      console.error("Error deleting electric car:", error);
      res.json({
        isError: true,
        body: {
          message: error.message,
        },
      });
    }
  }
);

export default router;
