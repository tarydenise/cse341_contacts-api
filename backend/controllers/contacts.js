const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid contact ID format" });
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in getSingle:", err);
    next(err);
  }
};

module.exports = { getAll, getSingle };
