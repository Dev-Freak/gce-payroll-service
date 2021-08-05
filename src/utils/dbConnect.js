const getDB = async (country) => {
  try {
    // TODO:  El archivo de base de datos (temporal) usado a continuación, idealmente debera ser alojado en una base de datos real.
    //        Se recomienda una base de datos no-relacional (MongoDB, MariaDB) dado que la naturaleza de la data utilizada para el
    //        proceso usualmente no se relaciona entre sí.
    const db = require("../database.json");

    const data = db.data.filter((item) => item.name === country)[0];

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = getDB;
