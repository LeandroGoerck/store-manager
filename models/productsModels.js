const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection
    .execute(
      `INSERT INTO 
        StoreManager.products (name, quantity)
      VALUES (?,?)`,
      [name, quantity],
      );

    return {
      id: insertId,
    };
};

module.exports = {
  create,
};