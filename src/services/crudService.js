import ResponseHandler from "../utils/responseHandler.js";

export default class CrudService {
  constructor(model, mainField = "") {
    this.model = model;
    this.mainField = mainField;
  }

  async create(data) {
    try {
      const obj = await this.model.create(data);
      return ResponseHandler.createSuccess(
        obj[this.mainField],
        obj.id,
        obj
      );
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await ResponseHandler.valueAlreadyExistsOnDb(this.model, data);
      }
      throw error; 
    }
  }

  async read(id) {
    const obj = await this.model.findByPk(id);
    if (!obj) ResponseHandler.notFoundError(this.model.name, id);
    return ResponseHandler.getSingleSuccess(obj[this.mainField], obj.id, obj);
  }

  async readAll() {
    const objs = await this.model.findAll({ order: [["id", "ASC"]] });
    if (objs.length === 0)
      ResponseHandler.dbNotPopulatedError(this.model.name);
    return ResponseHandler.getAllSuccess(this.model.name, objs);
  }

  async update(id, data) {
    const obj = await this.model.findByPk(id);
    if (!obj) ResponseHandler.notFoundError(this.model.name, id);

    try {
      await obj.update(data);
      return ResponseHandler.updateSuccess(
        obj[this.mainField],
        obj.id,
        obj
      );
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await ResponseHandler.valueAlreadyExistsOnDb(this.model, data, id);
      }
      throw error;
    }
  }

  async delete(id) {
    const obj = await this.model.findByPk(id);
    if (!obj) ResponseHandler.notFoundError(this.model.name, id);

    await obj.destroy();
    return ResponseHandler.deleteSuccess(obj[this.mainField], obj.id, obj);
  }
}
