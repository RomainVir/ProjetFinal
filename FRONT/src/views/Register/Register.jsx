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
        <label htmlFor="company">Company</label>
        <input
          value={values.company}
          onChange={handleChange}
          onBlur={handleBlur}
          id="company"
          name="company"
          placeholder="Entrez le nom de votre entreprise"
          className={errors.company && touched.company ? "input-error" : ""}
        />
        {errors.company && touched.company && (
          <p className="error">{errors.company}</p>
        )}
        <label htmlFor="boss">Name</label>
        <input
          id="boss"
          name="name"
          placeholder="Entrez votre nom"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? "input-error" : ""}
        />
        {errors.name && touched.name && <p className="error">{errors.name}</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Entrez votre email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}

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
          Créer votre compte
        </button>
      </form>
      <pre>{JSON.stringify({ values, errors }, null, 1)}</pre>
    </>
  );
}
