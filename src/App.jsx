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
      {/* Barra de navegação preta no topo do site */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/filmes/">Filmes</Link>
          
          <div className="collapse navbar-collapse">
            {/* Este ul serve para empurrar o botão verde para a direita */}
            <ul className="navbar-nav me-auto">
            </ul>
            
            {/* Botão que fica no canto direito para abrir o formulário de criar filme */}
            <Link className="btn btn-success" to="/filmes/add">Novo Filme</Link>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          {/* Se o link acabar em /filmes/, mostra a lista de filmes */}
          <Route path="/filmes/" element={<FilmeList />} />
          
          {/* Se o link acabar em /filmes/add, mostra o formulário de adicionar */}
          <Route path="/filmes/add" element={<FilmeAdd />} />
          
          {/* Se o link tiver um ID no fim, abre a página de edição desse filme específico */}
          <Route path="/filmes/edit/:filmeId" element={<FilmeEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;