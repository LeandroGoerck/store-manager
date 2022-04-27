const connection = require('./connection');

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

const findByName = async (name) => {
  const lowerCaseName = name.toLowerCase();
  const [response] = await connection
    .execute(`SELECT LCASE(name) FROM StoreManager.products
              WHERE name LIKE ?`, [lowerCaseName]);
  return response;
};

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

const updateProduct = async ({ id, name, quantity }) => {
  const [{ insertId }] = await connection
    .execute(`
  UPDATE StoreManager.products
    SET name = ? , quantity = ?
    WHERE id = ?;`, [name, quantity, id]);
  return { id: insertId, name, quantity };
};

const deleteById = async (id) => {
  await connection.execute(`
  DELETE FROM StoreManager.products
  WHERE id = ?;`, [id]);
  return true;
};

module.exports = {
  getAll,
  getById,
  findByName,
  createNewProduct,
  updateProduct,
  deleteById,
};