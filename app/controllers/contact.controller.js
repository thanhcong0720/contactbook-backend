const ApiError = require("../api-error");
const Contact = require("../models/contact.model");

const create = async (req, res, next) => {
  if (!req.body.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const contact = new Contact(req.body);
    await contact.save();
    return res
      .status(201)
      .json({ message: "Create contact successfully", contact });
  } catch (error) {
    return next(
      new ApiError(500, "An error occured while creating the contact")
    );
  }
};

const findAll = async (req, res, next) => {
  let documents = [];

  try {
    const { name } = req.query;
    if (name) {
      documents = await Contact.find({
        name: { $regex: new RegExp(name), $options: "i" },
      });
    } else {
      documents = await Contact.find({});
    }
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occured while retrieving contacts")
    );
  }
};

const findOne = async (req, res, next) => {
  try {
    const document = await Contact.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
};
const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    let document = await Contact.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    document = Object.assign(document, req.body);
    await document.save();
    return res.send({ message: "Contact was updated successfully", document });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};
const Delete = async (req, res, next) => {
  try {
    let document = await Contact.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    await document.delete();
    return res.send({ message: "Contact was deleted successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
};
const deleteAll = async (req, res, next) => {
  try {
    const { deletedCount } = await Contact.deleteMany({});
    return res.send({
      message: `${deletedCount} contacts were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occured while removing all contacts")
    );
  }
};
const findAllFavorite = async (req, res, next) => {
  try {
    const documents = await Contact.find({ favorite: true });
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occured while retrieving favorite contacts")
    );
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  Delete,
  deleteAll,
  findAllFavorite,
};
