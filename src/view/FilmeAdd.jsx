import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../App.css';

const FilmeAdd = () => {
  const [campTitulo, setCampTitulo] = useState("");
  const [campDescricao, setCampDescricao] = useState("");
  const [campFoto, setCampFoto] = useState("");
  const [selectGenero, setSelectGenero] = useState("");

  function SendSave(e) {
    e.preventDefault(); 

    const baseUrl = "http://localhost:3000/filmes/filme_create"; 

    const datapost = {
      titulo: campTitulo,
      descricao: campDescricao, 
      foto: campFoto,
      generoId: Number(selectGenero)
    };

    axios.post(baseUrl, datapost)
      .then(response => {
        if (response.data.success === true) {
          // AVISO DE SUCESSO
          Swal.fire({
            icon: 'success',
            title: 'Guardado!',
            text: 'Filme adicionado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          
          setCampTitulo("");
          setCampDescricao("");
          setCampFoto("");
          setSelectGenero("");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao gravar',
            text: 'Verifica os dados inseridos.'
          });
        }
      }).catch(error => {
        const erroReal = error.response && error.response.data && error.response.data.error 
                         ? error.response.data.error 
                         : error.message;
        Swal.fire({
          icon: 'error',
          title: 'Erro no PostgreSQL',
          text: erroReal
        });
      });
  } 

  return (
    <div className="add-filme-container">
      <h2>Adicionar Novo Filme</h2>
      <hr />
      <form onSubmit={SendSave}>
        <div className="add-filme-linha">
          <label>Título do Filme</label>
          <div className="add-filme-input">
            <input type="text" className="form-control" 
              value={campTitulo} onChange={(e) => setCampTitulo(e.target.value)} required />
          </div>
        </div>

        <div className="add-filme-linha">
          <label>Descrição</label>
          <div className="add-filme-input">
            <textarea className="form-control"
              value={campDescricao} onChange={(e) => setCampDescricao(e.target.value)} rows="3" />
          </div>
        </div>

        <div className="add-filme-linha">
          <label>Nome da Foto</label>
          <div className="add-filme-input">
            <input type="text" className="form-control"  
              value={campFoto} onChange={(e) => setCampFoto(e.target.value)} />
          </div>
        </div>

        <div className="add-filme-linha">
          <label>Género</label>
          <div className="add-filme-input">
            <select className="form-control" value={selectGenero} onChange={(e) => setSelectGenero(e.target.value)} required>
              <option value="">Escolhe um género...</option>
              <option value="1">Ação</option>
              <option value="2">Drama</option>
              <option value="3">Comédia</option>
              <option value="4">Aventura</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success">Gravar Filme</button>
      </form>
    </div>
  );
};

export default FilmeAdd;  