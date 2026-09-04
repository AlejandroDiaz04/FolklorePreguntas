import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = nombre.trim();

    if (trimmed.length < 2) {
      setError("Ingresá un nombre de al menos 2 caracteres.");
      return;
    }

    sessionStorage.setItem("jugadorNombre", trimmed);
    navigate("/quiz", { state: { nombre: trimmed } });
  }

  return (
    <div className="page page--home">
      <div className="card">
        <h1 className="titulo">Quiz de Folklore Paraguayo</h1>
        <p className="subtitulo">
          Respondé 10 preguntas sobre mitos, tradiciones, comidas y cultura.
        </p>

        <form onSubmit={handleSubmit} className="form-home">
          <label htmlFor="nombre" className="form-home__label">
            Tu nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="input"
            placeholder="Ej: Alana"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setError("");
            }}
            maxLength={30}
            autoComplete="name"
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn btn--primary">
            Jugar
          </button>
          <Link to="/ranking" className="btn btn--secondary">
            Ver ranking
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Home;
