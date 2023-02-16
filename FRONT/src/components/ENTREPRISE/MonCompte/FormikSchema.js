import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//5 caracteres,1 mayuscula,1 minuscula,1 numero
export const FormikSchema = yup.object().shape({
  email: yup.string().email("Insérer un email valide"),
  nombre: yup.string(),
  password: yup.string().matches(passwordRules, {
    message:
      "Veuillez choisir un mot de passe contenant au moins 5 caractères, une majuscule et un chiffre",
  }),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mot de passe incorrect"),
  telefono: yup.number().positive().integer(),
  apellidos: yup.string(),
});
