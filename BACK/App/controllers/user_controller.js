//Ahora en nuestro archivo user_controller.js hacemos la lógica para registrar un nuevo usuario. Primero buscamos por el email si
//el usuario que se quiere registrar ya existe y si no es así lo añadimos a la base de datos.

import dao from "../services/dao.js";
import { SignJWT, jwtVerify } from "jose";
import md5 from "md5";
import { transporter } from "../config/nodemailer.js";

const controller = {};

//AJOUTER  UN UTILISATEUR
controller.addUser = async (req, res) => {
  const {
    companyName,
    contactName,
    contactSurname,
    email,
    phone,
    address,
    postalCode,
    town,
    type,
    password,
  } = req.body;

  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (
    !companyName ||
    !contactName ||
    !contactSurname ||
    !email ||
    !phone ||
    !address ||
    !postalCode ||
    !town ||
    !type ||
    !password
  )
    return res.status(400).send("Error receiving body - usercontroller");
  // Buscamos el usuario en la base de datos
  try {
    let user = await dao.getUserByEmail(email);
    // Si existe el usuario respondemos con un 409 (conflict)
    if (user.length > 0) return res.status(409).send("User already registered");
    // Si no existe lo registramos
    const addUser = await dao.addUser(req.body);
    if (addUser)
      await transporter.sendMail({
        from: '"Bienvenido a proyecto" <proyectoromain@gmail.com>', // sender address
        to: "<romainviravaud@gmail.com>", // list of receivers
        subject: `Hello ${contactName}`, // Subject line
        html: "<b>HOLAAAAAA</b>", // html body
      });
    return res.send(`User ${contactName} with id: ${addUser} registered!`);
  } catch (e) {
    console.log(e.message);
  }
};

// LOGIN DE l'UTILISATEUR
controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!email || !password)
    return res.status(400).send("Error receiving the body");

  try {
    let user = await dao.getUserByEmail(email);

    // Si no existe el usuario respondemos con un 404 (not found)
    if (user.length <= 0) return res.status(404).send("User not registered");
    // Pasamos md5 a la paswword recibida del cliente
    const clienPassword = md5(password);
    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    [user] = user;
    console.log(user);
    console.log(clienPassword);
    // Si existe el usuario, comprobamos que la password es correcta. Si no lo es devolvemos un 401 (unathorized)
    if (user.password !== clienPassword)
      return res.status(401).send("incorrect password");
    // Si es correcta generamos el token y lo devolvemos al cliente
    // Construimos el JWT con el id, email y rol del usuario
    const jwtConstructor = new SignJWT({
      id: user.id,
      email,
      role: user.role,
    });

    // Codificamos el la clave secreta definida en la variable de entorno por requisito de la librería jose
    // y poder pasarla en el formato correcto (uint8Array) en el método .sign
    const encoder = new TextEncoder();
    // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
    // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("3h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    //Si todo es correcto enviamos la respuesta. 200 OK
    return res.send({ jwt });
  } catch (e) {
    console.log(e.message);
  }
};

// ELIMINER UN UTILISATEUR VIA ID
controller.deleteUser = async (req, res) => {
  // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];

  try {
    // codificamos la clave secreta
    const encoder = new TextEncoder();
    // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );
    // Verificamos que seamos usuario administrador
    console.log(payload.role);
    if (!payload.role)
      return res.status(409).send("no tiene permiso de administrador");
    // Buscamos si el id del usuario existe en la base de datos
    const user = await dao.getUserById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (user.length <= 0) return res.status(404).send("el usuario no existe");
    // Si existe, eliminamos el usuario por el id
    await dao.deleteUser(req.params.id);
    // Devolvemos la respuesta
    return res.send(`Usuario con id ${req.params.id} eliminado`);
  } catch (e) {
    console.log(e.message);
  }
};

// MODIFIER  UN UTILISATEUR VIA ID
controller.updateUser = async (req, res) => {
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);

  try {
    // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error al recibir el body");
    // Actualizamos el usuario
    await dao.updateUser(req.params.id, req.body);
    // Devolvemos la respuesta
    return res.send(`Usuario con id ${req.params.id} modificado`);
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR users
controller.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await dao.getUser(id);
    [user] = user;

    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(user);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

//EMAIL
controller.envoyerInfo = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await dao.getUser(id);
    let pedido = await dao.getPedidoByUser(id);

    if (user && pedido) {
      console.log(pedido);
      await transporter.sendMail({
        from: '"Bienvenido a proyecto" <romainviravaud@gmail.com>', // sender address
        to: "<romainviravaud@gmail.com>", // list of receivers
        subject: `Hello `, // Subject line
        html: `<form>
        <div className="formulaire">
          <h5>Cerfa n° 11580*04</h5>
          <h3>
            Reçu au titre des dons à certains organismes d’intérêt général{" "}
            <br />
            Article 200, 238 bis et 978 du code général des impôts (CGI)
          </h3>
          <h4>Bénéficiaire des versements</h4>
          <p>${user[0].companyName} </p>
          <div>
            <h4>Adresse</h4>
            <p>${user[0].address} </p>
            <p>${user[0].postalCode} </p>
            <p>${user[0].town} </p>
            <h4>Type de structure:</h4>
            <p>
              ${user[0].type} 
            </p>

            <br />
          </div>
          <br />
         
        </div>
      </form>
      `, // html body
      });
    }

    return res.send().status(200);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
