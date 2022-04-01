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

const getAll = async () => {
  const [response] = await connection
    .execute('SELECT * FROM StoreManager.products;');
  return response;
};

const getById = async (id) => {
  const [response] = await connection
    .execute('SELECT * FROM StoreManager.products where id = ?;', [id]);
  return response;
};

module.exports = {
  create,
  getAll,
  getById,
};