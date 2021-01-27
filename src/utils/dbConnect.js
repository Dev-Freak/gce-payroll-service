const getDB = async (country) => {
  try {
    const db = require("../database.json");

    const data = db.data.filter((item) => item.name === country)[0];

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = getDB;
