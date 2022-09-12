const { Contact } = require("../models/contact");
const RequestError = require("../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
