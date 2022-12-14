const connection = require('./connection');

const getAll = async () => {
  const [response] = await connection
    .execute(`SELECT SP.sale_id, SL.date, SP.product_id, PR.quantity  FROM StoreManager.sales as SL
    JOIN StoreManager.sales_products as SP ON SP.sale_id = SL.id
    JOIN StoreManager.products as PR ON PR.id = SP.product_id
    ORDER BY SP.sale_id, SP.product_id;`);
  return response;
};

const getById = async (id) => {
  const [response] = await connection
    .execute(`SELECT SP.sale_id, SL.date, SP.product_id, PR.quantity  FROM StoreManager.sales as SL
    JOIN StoreManager.sales_products as SP ON SP.sale_id = SL.id
    JOIN StoreManager.products as PR ON PR.id = SP.product_id
    WHERE SP.sale_id = ?
    ORDER BY SP.sale_id, SP.product_id;`, [id]);
  return response;
};

const createNewSale = async (productId, quantity) => {
  console.log(quantity, productId);

  const [{ insertId }] = await connection
    .execute(
      `INSERT INTO 
        StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?,?)`,
      [1, productId, quantity],
      );

    return {
      id: insertId,
    };
};

const updateSale = async (id, productId, quantity) => {
  console.log('sales: ', id, productId, quantity);

  await connection.execute(`
    UPDATE StoreManager.sales_products
    SET quantity = ?, product_id = ?
    WHERE sale_id = ?;`, [quantity, productId, id]);

  await connection.execute(`
  UPDATE StoreManager.products
    SET quantity = ?
    WHERE id = ?;`, [quantity, productId]);
};

const deleteById = async (id) => {
  console.log('delete id: ', id);
  await connection.execute(`
  DELETE FROM StoreManager.sales_products WHERE sale_id = ?`, [id]);
};

module.exports = {
  getAll,
  getById,
  createNewSale,
  updateSale,
  deleteById,
};