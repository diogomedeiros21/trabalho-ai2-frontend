import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FilmeList from './view/FilmeList';
import FilmeAdd from './view/FilmeAdd';
import FilmeEdit from './view/FilmeEdit';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/filmes/">Filmes</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/filmes/">Listagem</Link>
              </li>
            </ul>
            <Link className="btn btn-success" to="/filmes/add">Novo Filme</Link>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/filmes/" element={<FilmeList />} />
          <Route path="/filmes/add" element={<FilmeAdd />} />
          <Route path="/filmes/edit/:filmeId" element={<FilmeEdit />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;