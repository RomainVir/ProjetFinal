import db from "../mysql.js";

const deliveryQueries = {};

// add a delivery
deliveryQueries.addDelivery = async (deliveryData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    return await db.query(
      "INSERT INTO deliveries SET ?",
      deliveryData,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

//get a delivery

deliveryQueries.getDelivery = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM TestProject.deliveries join TestProject.company on deliveries.idCompany = company.id", [], "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default deliveryQueries;
