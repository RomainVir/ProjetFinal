import db from "../mysql.js";
import moment from "moment/moment.js";

import utils from "../../utils/utils.js";

const donationsQueries = {};

//AJOUTER UNe Offre
donationsQueries.addOffer = async (productData) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    console.log(productData);
    let productObj = {
      idproduct: productData.id,
      quantity: productData.quantity,
    };
    return await db.query(
      "INSERT INTO offers SET ?",
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

export default donationsQueries;
