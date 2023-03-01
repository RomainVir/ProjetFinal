import db from "../mysql.js";
import moment from "moment/moment.js";

import utils from "../../utils/utils.js";

const productQueries = {};

//OBTENIR UN PRODUIT PAR SA REF
productQueries.getProductById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM products WHERE products.id = ?",
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
productQueries.getProductByRef = async (reference) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM products WHERE reference = ?",
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
productQueries.addProduct = async (productData) => {
  let conn = null;
  try {
    console.log(productData, "data");
    conn = await db.createConnection();

    return await db.query(
      "INSERT INTO products SET ?",
      productData,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

//OBTENIR UN PRODUIT
productQueries.getProduct = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM products", [], "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// MODIFIER UN PRODUIT PAR SON ID
productQueries.updateProduct = async (id, productData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos que nos puede llegar del usuario a modificar en la base de datos.
    // Encriptamos la password con md5 si nos llega por el body, sino la declaramos como undefined
    // y usamos la libreria momentjs para actualizar la fecha.
    let productObj = {
      reference: productData.reference,
      description: productData.description,
    };
    // Eliminamos los campos que no se van a modificar (no llegan por el body)
    productObj = await utils.removeUndefinedKeys(productObj);

    return await db.query(
      "UPDATE products SET ? WHERE id = ?",
      [productObj, id],
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// SUPPRIMER UN PRODUIT PAR SON ID
productQueries.deleteProduct = async (id) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM Products WHERE id = ?",
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

// SUPPRIMER UN PRODUIT PAR SA REF
productQueries.deleteProductByRef = async (reference) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM Products WHERE reference = ?",
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

export default productQueries;
