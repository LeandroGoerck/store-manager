const connection = require('./connection');

const createNewProduct = async ({ name, quantity }) => {
  const [{ insertId }] = await connection
    .execute(
      `INSERT INTO 
        StoreManager.products (name, quantity)
      VALUES (?,?);`,
      [name, quantity],
      );

    return {
      id: insertId,
    };
};

const getAll = async () => {
  const [response] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return response;
};

const getById = async (id) => {
  const [response] = await connection
    .execute('SELECT * FROM StoreManager.products where id = ?;', [id]);
  return response[0];
};

const updateProduct = async ({ id, name, quantity }) => {
  const [{ insertId }] = await connection
    .execute(`
  UPDATE StoreManager.products
    SET name = ? , quantity = ?
    WHERE id = ?;`, [name, quantity, id]);
  return { id: insertId, name, quantity };
};

const findByName = async (name) => {
  const lowerCaseName = name.toLowerCase();
  const [response] = await connection
    .execute(`SELECT LCASE(name) FROM StoreManager.products
              WHERE name LIKE ?`, [lowerCaseName]);
  return response;
};

module.exports = {
  createNewProduct,
  getAll,
  getById,
  updateProduct,
  findByName,
};