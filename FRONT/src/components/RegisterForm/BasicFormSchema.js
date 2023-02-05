import * as yup from "yup";

//const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const BasicFormSchema = yup.object().shape({
  companyName: yup.string().required("Required"),
  contactName: yup.string().required("Required"),
  contactSurname: yup.string().required("Required"),
  email: yup.string().required("Required"),
  phone: yup.number(10).required("Required"),
  address: yup.string().required("Required"),
  postalCode: yup.number(5).required("Required"),
  town: yup.string().required("Required"),
  password: yup
    .string()
    .min(5)
    //.matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
