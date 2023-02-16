import { useFormik } from "formik";
import { FormikSchema } from "./FormikSchema.js";
import { useAuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

export default function ModifierUser() {
  const { authorization } = useAuthContext();
  const params = useParams();
  async function onSubmit(values, actions) {
    fetch(`http://localhost:3000/user/${params.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values, authorization),
    }).then((response) => {
      console.log(values);
      if (response.status === 400) {
        alert("Erreur");
      } else if (response.status === 200) {
        alert(`Utilisateur ${params.id} modifié correctement`);
      } else if (response.status === 409) {
        alert("Utilisateur déjà modifié");
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    actions.resetForm();
  }

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      companyName: "",
      contactSurname: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      town: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: FormikSchema,
    onSubmit,
  });
  return (
    <div>
      <form onSubmit={handleSubmit} className="formMonCompte">
        <h1>Modifier</h1>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Nom de l'entreprise
          </label>
          <input
            type="text"
            className={
              errors.companyName && touched.companyName
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.companyName}
            name="companyName"
            onChange={handleChange}
            onBlur={handleBlur}
            id="companyName"
          />
          <div
            className={
              errors.companyName && touched.companyName
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.companyName}
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Nom du contact
          </label>
          <input
            type="text"
            className={
              errors.contactSurname && touched.contactSurname
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.contactSurname}
            name="contactSurname"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div
            className={
              errors.contactSurname && touched.contactSurname
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.contactSurname}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Prénom du contact
          </label>
          <input
            type="text"
            className={
              errors.contactName && touched.contactName
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.contactName}
            name="contactName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div
            className={
              errors.contactName && touched.contactName
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.contactName}
          </div>
        </div>

        <div className="col-md-8">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={
              errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
            }
            aria-describedby="emailHelp"
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div
            className={
              errors.email && touched.email ? "invalid-feeback is-invalid" : ""
            }
          >
            {errors.email}
          </div>{" "}
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Téléphone
          </label>
          <input
            type="number"
            value={values.phone}
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.phone && touched.phone
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div
            className={
              errors.phone && touched.phone ? "invalid-feeback is-invalid" : ""
            }
          >
            {errors.phone}
          </div>{" "}
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Adresse
          </label>
          <input
            type="text"
            className={
              errors.address && touched.address
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.address}
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            id="address"
          />
          <div
            className={
              errors.address && touched.address
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.address}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Code postal
          </label>
          <input
            type="text"
            className={
              errors.postalCode && touched.postalCode
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.postalCode}
            name="postalCode"
            onChange={handleChange}
            onBlur={handleBlur}
            id="postalCode"
          />
          <div
            className={
              errors.postalCode && touched.postalCode
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.postalCode}
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Ville
          </label>
          <input
            type="text"
            className={
              errors.town && touched.town
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.town}
            name="town"
            onChange={handleChange}
            onBlur={handleBlur}
            id="town"
          />
          <div
            className={
              errors.town && touched.town ? "invalid-feeback is-invalid" : ""
            }
          >
            {errors.town}
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div
            className={
              errors.password && touched.password
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.password}
          </div>{" "}
        </div>
        <div className="col-md-6">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirmer mot de passe{" "}
          </label>
          <input
            type="password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div
            className={
              errors.password && touched.password
                ? "invalid-feeback is-invalid"
                : ""
            }
          >
            {errors.password}
          </div>{" "}
        </div>

        <button disabled={isSubmitting} type="submit">
          Modifier mes informations
        </button>
      </form>
    </div>
  );
}
