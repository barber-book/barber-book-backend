import ResponseHandler from "../utils/responseHandler.ts";

export default class CrudService {
  model: any;
  mainField: string;

  constructor(model: any, mainField: string = "") {
    this.model = model;
    this.mainField = mainField;
  }

  async create(data: any) {
    try {
      const obj = await this.model.create(data);
      return ResponseHandler.createSuccess(
        obj[this.mainField],
        obj.id,
        obj
      );
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await ResponseHandler.valueAlreadyExistsOnDb(this.model, data);
      }
      throw error; 
    }
  }

  async read(id: any) {
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

  async update(id: any, data: any) {
    const obj = await this.model.findByPk(id);
    if (!obj) ResponseHandler.notFoundError(this.model.name, id);

    try {
      await obj.update(data);
      return ResponseHandler.updateSuccess(
        obj[this.mainField],
        obj.id,
        obj
      );
    } catch (error: any) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await ResponseHandler.valueAlreadyExistsOnDb(this.model, data, id);
      }
      throw error;
    }
  }

  async delete(id: any) {
    const obj = await this.model.findByPk(id);
    if (!obj) ResponseHandler.notFoundError(this.model.name, id);

    await obj.destroy();
    return ResponseHandler.deleteSuccess(obj[this.mainField], obj.id, obj);
  }
}
