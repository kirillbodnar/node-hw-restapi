const express = require("express");

const router = express.Router();

const controller = require("../../controllers/");

const { isValidId, validationBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = controller;

router.get("/", listContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", validationBody(schemas.addSchema), addContact);

router.delete("/:id", deleteContact);

router.put(
  "/:id",
  isValidId,
  validationBody(schemas.updateSchema),
  updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
