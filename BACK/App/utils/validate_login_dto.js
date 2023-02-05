// importamos Type de la libreria "@sinclair/typebox
import { Type } from "@sinclair/typebox";
// importamos la librería ajv
import Ajv from "ajv";
// importamos los paquetes que extienden la funcionalidad de ajv
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Componemos el esquema usando la librería con la propiedad Type
const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "Type of email has to be a string",
        format: "Please ener a correct email",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "Type of password should be a string",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      type: "Should be an object",
      additionalProperties: "Format is not valid",
      required: {
        email: "Email is required",
        password: "Password is required",
      },
    },
  }
);

//instanciamos la clase
const ajv = new Ajv({ allErrors: true }); // allErrors:true nos valida los fallos de los dos campos (email y password)
// funciones para extender la funcionalidad de Ajv.
// addFormats añade formato de validación (lo aplicamos a email)
addFormats(ajv, ["email"]);
// addErrors permite personalizar los errores.
addErrors(ajv, { keepErrors: false });

// Metemos el esquema en el ajv para generar una función de validación
const validate = ajv.compile(LoginDTOSchema);

// Función para validar el dto (email, password)
const validateLoginDto = (req, res, next) => {
  // le pasamos la funciónd e validación
  const isDTOValid = validate(req.body);
  // Si no ha pasado la validación enviamos un 400 y el tipo de error de la validación

  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: "\n" }));

  next();
};

export default validateLoginDto;
