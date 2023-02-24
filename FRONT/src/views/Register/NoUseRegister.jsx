import { useFormik } from "formik";
import { BasicFormSchema } from "../../components/RegisterForm/BasicFormSchema";
import { initialValues } from "../../components/RegisterForm/form";
import { useAuthContext } from "../../context/AuthContext";
import "./Register.css";

export default function Register() {
  const { register } = useAuthContext();
  async function onSubmit(values, actions) {
    register(values);
    actions.resetForm();
  }
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: BasicFormSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="companyName">Empresa</label>
        <input
          value={values.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          id="companyName"
          name="companyName"
          placeholder="Entrez le nom de votre entreprise"
          className={
            errors.companyName && touched.companyName ? "input-error" : ""
          }
        />
        {errors.companyName && touched.companyName && (
          <p className="error">{errors.companyName}</p>
        )}
        <label htmlFor="contactSurname">Appelido</label>
        <input
          id="contactSurname"
          name="contactSurname"
          placeholder="Entrez votre nom"
          value={values.contactSurname}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.contactSurname && touched.contactSurname ? "input-error" : ""
          }
        />
        {errors.contactSurname && touched.contactSurname && (
          <p className="error">{errors.contactSurname}</p>
        )}
        <label htmlFor="contactName">Nombre</label>
        <input
          id="contactName"
          name="contactName"
          placeholder="Entrez votre prénom"
          value={values.contactName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.contactName && touched.contactName ? "input-error" : ""
          }
        />
        {errors.contactName && touched.contactName && (
          <p className="error">{errors.contactName}</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Entrez votre email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        <label htmlFor="phone">Téléphone</label>
        <input
          id="phone"
          name="phone"
          placeholder="Entrez votre numéro de téléphone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone ? "input-error" : ""}
        />
        {errors.phone && touched.phone && (
          <p className="error">{errors.phone}</p>
        )}

        <label htmlFor="address">Adresse</label>
        <input
          id="address"
          name="address"
          placeholder="Entrez votre adresse"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.address && touched.address ? "input-error" : ""}
        />
        {errors.address && touched.address && (
          <p className="error">{errors.address}</p>
        )}

        <label htmlFor="postalCode">Code postal</label>
        <input
          id="postalCode"
          name="postalCode"
          placeholder="Entrez votre code postal"
          value={values.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.postalCode && touched.postalCode ? "input-error" : ""
          }
        />
        {errors.postalCode && touched.postalCode && (
          <p className="error">{errors.postalCode}</p>
        )}
        <label htmlFor="town">Ville</label>
        <input
          id="town"
          name="town"
          placeholder="Entrez votre ville"
          value={values.town}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.town && touched.town ? "input-error" : ""}
        />
        {errors.town && touched.town && <p className="error">{errors.town}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "input-error"
              : ""
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <br />
        <br />
        <button className="submitbutton" disabled={isSubmitting} type="submit">
          Crear una cuenta
        </button>
      </form>
      <pre>{JSON.stringify({ values, errors }, null, 1)}</pre>
    </>
  );
}
