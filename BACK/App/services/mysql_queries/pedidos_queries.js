//Importamos el archivo mysql.js y definimos la función para buscar un usuario ya registrado:

import db from "../mysql.js";

const pedidoQueries = {};

//OBTENIR UN PRODUIT PAR SA REF
pedidoQueries.getPedidoById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM pedidos WHERE pedidos.id = ?",
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

//OBTENIR UN PRODUIT PAR SON ID
pedidoQueries.getPedidoByRef = async (reference) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      `SELECT * FROM pedidos WHERE reference = '?'`,
      reference,
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
      "UPDATE offers SET ? WHERE reference = ?",
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

export default pedidoQueries;
