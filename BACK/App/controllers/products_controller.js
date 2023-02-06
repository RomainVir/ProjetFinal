import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    if (!req.query) {
      return res.status(400).send("No hay id de producto");
    }

    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;
    images.forEach(async (image) => {
      let uploadPath = __dirname + "/public/images/" + image.name;
      let BBDDPath = "images/" + image.name;
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addImage({
        name: image.name,
        path: BBDDPath,
        idproducto: req.query.idproducto,
      });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const image = await dao.getImageById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (image.length <= 0) return res.status(404).send("La imagen no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.sendFile(image[0].path, { root: __dirname });
    //return res.send({ path: image[0].path });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addProduct = async (req, res) => {
  // controlar que viene el body
  const { reference, description, quantity, photo } = req.body;
  if (!reference || !description || !quantity || !photo) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    const product = await dao.getProductByRef(reference);
    // Si existe el producto, devolvemos 409 (conflict)
    if (product.length > 0) return res.status(409).send("Producto ya existe");
    // Si no existe, lo añadimos
    const insertProduct = await dao.insertProduct(req.body);
    if (insertProduct)
      return res.send(`Producto ${reference} con id${insertProduct} añadido`);
  } catch (e) {
    console.log(e.message);
  }
  // Buscamos si existe producto por la referencia
  // añadimos producto producto detalle  -> creamos query para añadir producto (insert), creamos el dao
  // nos devuelve el id del producto
  // utilizamos la libreria express-upload para subir la imagen
  // Añadimos el path a la tabla imagen y el id que hemos obtenido del producto
  // devolvemos respuesta al cliente con el id del producto creado ok
};

controller.getProduct = async (req, res) => {
  try {
    const product = await dao.getProduct();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(product);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getProductById = async (req, res) => {
  try {
    const product = await dao.getProductById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(product[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};
export default controller;
