//Importamos el archivo mysql.js y definimos la función para buscar un usuario ya registrado:

import db from "../mysql.js";

import utils from "../../utils/utils.js";

const offerQueries = {};

//OBTENIR UN PRODUIT PAR SA REF
offerQueries.getOfferById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM offers WHERE offers.id = ?",
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
offerQueries.getOfferByRef = async (reference) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM offers WHERE reference = ?",
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
offerQueries.addOffer = async (offerData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    return await db.query(
      "INSERT INTO offers SET ?",
      offerData,
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
offerQueries.getOffer = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM offers", [], "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// MODIFIER UN PRODUIT PAR SON ID
offerQueries.updateOffer = async (id, offerData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
 

    return await db.query(
      "UPDATE offers SET ? WHERE reference = ?",
      [offerData, id],
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
offerQueries.deleteOffer = async (id) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM offers WHERE id = ?",
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

export default offerQueries;
