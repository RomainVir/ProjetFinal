import db from "../mysql.js";
import moment from "moment/moment.js";

import utils from "../../utils/utils.js";

const productQueries = {};

productQueries.addImage = async (imageData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los dats de la imagen a guardar en la base de datos.
    // Usamos la libreria momentjs para registrar la fecha actual
    let imageObj = {
      nombreimg: imageData.name,
      path: imageData.path,
      fechaAlta: moment().format("YYYY-MM-DD HH:mm:ss"),
      idproducto: imageData.idproducto,
    };
    return await db.query(
      "INSERT INTO imagenes SET ?",
      imageObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

productQueries.getImageById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM imagenes WHERE id = ?",
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

productQueries.getProductById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM products JOIN imagenes on products.id = imagenes.idproducto WHERE products.id = ?",
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

productQueries.deleteImage = async (id) => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE * FROM imagenes WHERE id = ?",
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

productQueries.addProduct = async (productData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    console.log(productData);
    let productObj = {
      reference: productData.reference,
      description: productData.description,
      quantity: productData.quantity,
      photo: productData.photo,
    };
    return await db.query(
      "INSERT INTO products SET ?",
      productObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

productQueries.getProduct = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM products JOIN imagenes on products.id = imagenes.idproducto",
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

// Modificar un usuario por su id
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
      quantity: productData.quantity,
      photo: productData.photo,
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

export default productQueries;
