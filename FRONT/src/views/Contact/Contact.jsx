import "./Contact.css";

export default function Contact() {
  return (
    <>
      <div className="form-style-8">
        <h2>Contactez-nous</h2>
        <form className="contactform">
          <input type="text" name="field1" placeholder="Nom " />
          <input type="email" name="field2" placeholder="Email" />
          <input type="url" name="field3" placeholder="Entreprise" />
          <textarea
            placeholder="Ecrivez votre message"
            onkeyup="adjust_textarea(this)"
          ></textarea>
          <input type="button" value="Envoyez le message" />
        </form>
      </div>
    </>
  );
}
