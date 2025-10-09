import userService from "../services/userService.js";

export async function listUsers(req, res, next) {
  try {
    const result = await userService.readAll();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const result = await userService.read(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const result = await userService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const result = await userService.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const result = await userService.delete(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await userService.validateLogin(email, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
