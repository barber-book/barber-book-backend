export default class ResponseHandler {

  static success(message, data = null) {
    return { message, data };
  }


  static getSingleSuccess(name, id, data) {
    const message = `Details for ${name} with id ${id}`;
    return this.success(message, data);
  }


  static getAllSuccess(object, data) {
    const message = `Details for all ${object}s`;
    return this.success(message, data);
  }

  static createSuccess(name, id, data) {
    const message = `${name} with id ${id} created successfully`;
    return this.success(message, data);
  }


  static updateSuccess(name, id, data) {
    const message = `${name} with id ${id} updated successfully`;
    return this.success(message, data);
  }

 
  static deleteSuccess(name, id, data) {
    const message = `${name} with id ${id} deleted successfully`;
    return this.success(message, data);
  }

  
  static notFoundError(name = "", id = null) {
    const message = `${name} with id ${id} not found!`;
    const error = new Error(message);
    error.status = 404;
    throw error;
  }

  
  static dbNotPopulatedError(name = "") {
    const message = `${name} table is empty`;
    const error = new Error(message);
    error.status = 404;
    throw error;
  }


  static async valueAlreadyExistsOnDb(model, obj, excludeId = null) {
    const uniqueFields = Object.keys(model.rawAttributes)
      .filter(
        (key) =>
          model.rawAttributes[key].unique && !model.rawAttributes[key].primaryKey
      );

    const duplications = {};

    for (const field of uniqueFields) {
      const value = obj[field];
      if (value === undefined || value === null) continue;

      const where = { [field]: value };
      if (excludeId) where.id = { [model.sequelize.Op.ne]: excludeId };

      const existing = await model.findOne({ where });
      if (existing) duplications[field] = `${value} already exists`;
    }

    if (Object.keys(duplications).length > 0) {
      const error = new Error("Duplicate value");
      error.status = 409;
      error.detail = duplications;
      throw error;
    }

    const error = new Error(
      "Database integrity error, but no unique constraint violation found."
    );
    error.status = 400;
    throw error;
  }

  static invalidToken(name = "") {
    const error = new Error(`Invalid ${name} token.`);
    error.status = 401;
    error.headers = { "WWW-Authenticate": "Bearer" };
    throw error;
  }
}
