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

module.exports = {
  getAll,
  getById,
  createNewSale,
};