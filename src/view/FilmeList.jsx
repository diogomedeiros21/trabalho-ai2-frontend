import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.min.css';
import '../App.css';

const FilmeList = () => {
  // Variável de estado que vai guardar a lista de todos os filmes que vêm da base de dados
  const [filmes, setFilmes] = useState([]);
  
  const urlAPI = "https://trabalho-ai2-backend.onrender.com/filmes";

  useEffect(() => { LoadFilmes(); }, []);

  // Função que vai ao backend pedir a lista completa de filmes
  function LoadFilmes() {
    axios.get(`${urlAPI}/filme_list`)
      .then(res => { 
        const dadosReais = res.data.data || res.data;
        setFilmes(dadosReais);
      })
      .catch(error => { console.error("Erro ao carregar: " + error); });
  }

  // Função para mostrar a pergunta antes de apagar
  const OnDelete = (id) => {
    Swal.fire({
      title: 'Tens a certeza?',
      text: "Não poderás recuperar este filme depois de o apagar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Não, manter',
      reverseButtons: true
    }).then((result) => {
      // Se o utilizador clicar no botão "Sim", chama a função para apagar mesmo
      if (result.isConfirmed) { SendDelete(id); }
    });
  }

  // Função que manda o pedido para apagar definitivamente o filme
  const SendDelete = (id) => {
    axios.delete(`${urlAPI}/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          Swal.fire('Apagado!', 'O filme foi removido.', 'success');
          LoadFilmes();
        }
      })
      .catch(error => { alert("Erro ao apagar: " + error); });
  }

  // A parte visual
  return (
    <div className="row mt-4">
      {filmes.map((f) => (
        <div className="col-md-4 mb-4" key={f.id}>
          <div className="card shadow-sm h-100">
            
            <div className="filme-card-hover">
              <img 
                src={f.foto} 
                className="filme-foto-frontal" 
                alt={f.titulo} 
              />
              
              {/* O texto e a sinopse que aparecem quando passamos o rato por cima da foto */}
              <div className="filme-info-overlay">
                <h6 className="text-uppercase font-weight-bold">Sinopse</h6>
                <p className="filme-sinopse-curta">
                  {f.descricao}
                </p>
              </div>
            </div>

            <div className="card-body d-flex flex-column text-center">
              <h5 className="card-title">{f.titulo}</h5>
              {/* Escreve o nome do género em texto, dependendo do ID guardado na base de dados */}
              <p className="text-muted small">
                {f.generoId === 1 ? "Ação" : 
                 f.generoId === 2 ? "Drama" : 
                 f.generoId === 3 ? "Comédia" : 
                 f.generoId === 4 ? "Aventura" : "Outro"}
              </p>
              
              <div className="mt-auto border-top pt-2">
                {/* O link para a página de edição */}
                <Link to={`/filmes/edit/${f.id}`} className="btn btn-outline-primary btn-sm me-2">Editar</Link>
                {/* Botão para apagar que aciona o aviso de segurança */}
                <button onClick={() => OnDelete(f.id)} className="btn btn-outline-danger btn-sm">Apagar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmeList;