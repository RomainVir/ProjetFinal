//Importamos el archivo mysql.js y definimos la función para buscar un usuario ya registrado:

import db from "../mysql.js";

import utils from "../../utils/utils.js";

const donationQueries = {};

//OBTENIR UN PRODUIT PAR SA REF
donationQueries.getDonationById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el producto por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM donations WHERE donations.id = ?",
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
donationQueries.getDonationByRef = async (reference) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM donations WHERE reference = ?",
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
donationQueries.addDonation = async (donationData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    console.log(donationData);
    let donationObj = {
      reference: donationData.reference,
      description: donationData.description,
      quantity: donationData.quantity,
      photo: donationData.photo,
    };
    return await db.query(
      "INSERT INTO donations SET ?",
      donationObj,
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
donationQueries.getDonation = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM donations", [], "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// MODIFIER UN PRODUIT PAR SON ID
donationQueries.updateDonation = async (id, donationData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos que nos puede llegar del usuario a modificar en la base de datos.
    // Encriptamos la password con md5 si nos llega por el body, sino la declaramos como undefined
    // y usamos la libreria momentjs para actualizar la fecha.
    let donationObj = {
      reference: donationData.reference,
      description: donationData.description,
      quantity: donationData.quantity,
      photo: donationData.photo,
    };
    // Eliminamos los campos que no se van a modificar (no llegan por el body)
    donationObj = await utils.removeUndefinedKeys(donationObj);

    return await db.query(
      "UPDATE donations SET ? WHERE id = ?",
      [donationObj, id],
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
donationQueries.deletedonation = async (id) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM donations WHERE id = ?",
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

export default donationQueries;
