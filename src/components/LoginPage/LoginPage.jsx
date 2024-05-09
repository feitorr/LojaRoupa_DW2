import "./LoginPage.css";
import googleLogo from "../../images/google.png";
import faceLogo from "../../images/facebook.png";
import instaLogo from "../../images//instagram.png";

const LoginPage = () => {
  return (
    <div className="form">
      <h1>Iniciar Sessão</h1>
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
        <div className="lembrar">
          <div>
            <input type="checkbox" name="lembra" id="lembra" />
            <label htmlFor="lembra">Lembrar-me</label>
          </div>

          <p className="inicialsec">Esqueceu-se da palavra-passe?</p>
        </div>
        <div className="Submit">
          <button type="submit">Iniciar Sessão</button>
        </div>

        <div className="Registo">
          <button type="submit">Registar-me</button>
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
    </div>
  );
};

export default LoginPage;
