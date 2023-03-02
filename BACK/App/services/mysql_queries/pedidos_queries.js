//Importamos el archivo mysql.js y definimos la función para buscar un usuario ya registrado:

import db from "../mysql.js";

const pedidoQueries = {};

//OBTENIR UN PEDIDO PAR USER
pedidoQueries.getPedidoByUser = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM pedidos WHERE pedidos.idCompany = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

pedidoQueries.getPedidoByUsers = async () => {
  //"SELECT * FROM TestProject.deliveries join TestProject.company on deliveries.idCompany = company.id", [], "select", conn)
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT company.companyName, pedidos.reference, pedidos.quantity_choosen FROM pedidos join company on pedidos.idCompany = company.id",
      [],
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

//OBTENIR UN PEDIDO PAR SON ID
pedidoQueries.getPedidoByRef = async (reference, idCompany) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      `SELECT * FROM pedidos WHERE reference = ? AND idCompany= ?`,
      [reference, idCompany],
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

//AJOUTER UN PRODUIT
pedidoQueries.addPedido = async (pedidoData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    return await db.query(
      "INSERT INTO pedidos SET ?",
      pedidoData,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

//OBTENIR UN offre
pedidoQueries.getPedido = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM pedidos", [], "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

//OBTENIR UN offre
pedidoQueries.getPedidoById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      `SELECT * FROM pedidos WHERE id=?`,
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// MODIFIER UN  PAR SON ID

// SUPPRIMER UN PRODUIT PAR SON ID
pedidoQueries.deletePedido = async (id) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM pedidos WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// MODIFIER UN PRODUIT PAR SON ID
pedidoQueries.updatePedido = async (quantity, reference) => {
  // Conectamos con la base de datos y añadimos el usuario.
  console.log(reference, quantity);
  let conn = null;
  try {
    conn = await db.createConnection();

    return await db.query(
      "UPDATE pedidos SET ? WHERE reference = ?",
      [quantity, reference],
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

pedidoQueries.deletePedidoById = async (id) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM pedidos WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};
export default pedidoQueries;
