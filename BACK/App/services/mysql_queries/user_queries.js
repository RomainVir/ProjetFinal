//Importamos el archivo mysql.js y definimos la función para buscar un usuario ya registrado:

import db from "../mysql.js";
import moment from "moment/moment.js";
import md5 from "md5";
import utils from "../../utils/utils.js";

const userQueries = {};

userQueries.getUserByEmail = async (email) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM company WHERE email = ?",
      email,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.addUser = async (userData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.
    // Encriptamos la password con md5 y usamos la libreria momentjs para registrar la fecha actual
    let userObj = {
      companyName: userData.companyName,
      contactName: userData.contactName,
      contactSurname: userData.contactSurname,
      email: userData.email,
      password: md5(userData.password),
      phone: userData.phone,
      address: userData.address,
      postalCode: userData.postalCode,
      town: userData.town,
    };
    return await db.query("INSERT INTO company SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

// Borrar un usuario por su id
userQueries.deleteUser = async (id) => {
  // Conectamos con la base de datos y eliminamos el usuario por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "DELETE FROM company WHERE id = ?",
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

// Buscar usuario por el id
userQueries.getUserById = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM company WHERE id = ?",
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

// Modificar un usuario por su id
userQueries.updateUser = async (id, userData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos que nos puede llegar del usuario a modificar en la base de datos.
    // Encriptamos la password con md5 si nos llega por el body, sino la declaramos como undefined
    // y usamos la libreria momentjs para actualizar la fecha.
    let userObj = {
      companyName: userData.companyName,
      contactName: userData.contactName,
      contactSurname: userData.contactSurname,
      email: userData.email,
      password: userData.password ? md5(userData.Password) : undefined,
      phone: userData.phone,
      address: userData.address,
      postalCode: userData.postalCode,
      town: userData.town,
    };
    // Eliminamos los campos que no se van a modificar (no llegan por el body)
    userObj = await utils.removeUndefinedKeys(userObj);

    return await db.query(
      "UPDATE company SET ? WHERE id = ?",
      [userObj, id],
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default userQueries;
