import "./SignUpPage.css";
import googleLogo from "../../images/google.png";
import faceLogo from "../../images/facebook.png";
import instaLogo from "../../images//instagram.png";

const SignUpPage = () => {
  return (
    <div className="form">
      <h1>Cria a tua Conta</h1>
      <form>
        <div className="Email">
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email *"
            required
          />
        </div>
        <div className="Password">
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password *"
            required
          />
        </div>
        <div className="Confirm-Password">
          <label htmlFor="confirm-password"></label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirme Password *"
            required
          />
        </div>
        <p className="inicialsec">Já tenho conta e quero iniciar sessão</p>
        <div className="Submit">
          <button type="submit">Criar Conta</button>
        </div>
      </form>
      <div>
        <hr />
      </div>
      <p>-- Entrar com --</p>
      <div className="cont-logos">
        <img src={googleLogo} alt="google" />
        <img src={faceLogo} alt="face" />
        <img src={instaLogo} alt="insta" />
      </div>
      <p className="convidado"> Entrar como convidado</p>
    </div>
  );
};

export default SignUpPage;
