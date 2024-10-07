const userRepository = require("../repositories/user.repository");

const createUser = async (userData) => {
  return await userRepository.createUser(userData);
};

const getAllUser = async () => {
  return await userRepository.getAllUser();
};

const getUser = async (id) => {
  return await userRepository.getUser(id);
};

const updateUser = async (id, updatedData) => {
  return await userRepository.updateUser(id, updatedData);
};

const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

const login = async (email, username, password) => {
  const user = await userRepository.findByEmailOrUsername(email, username);
  if (!user) {
    return { status: 404, data: { message: "User not found" } };
  }
  if (password !== user.password) {
    return { status: 400, data: { message: "Invalid password" } };
  }
  return { status: 200, data: { message: "Login successful", user } };
};

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  login,
};
