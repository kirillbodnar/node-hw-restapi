const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const {
  isValidId,
  validationBody,
  authentication,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = controller;

router.get("/", authentication, ctrlWrapper(listContacts));

router.get("/:id", authentication, isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  authentication,
  validationBody(schemas.addSchema),
  ctrlWrapper(addContact)
);

router.delete("/:id", authentication, ctrlWrapper(deleteContact));

router.put(
  "/:id",
  authentication,
  isValidId,
  validationBody(schemas.updateSchema),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:id/favorite",
  authentication,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateFavorite)
);

module.exports = router;
