import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../App.css';

const FilmeEdit = () => {
  // Variáveis para guardar os dados que vão aparecer no formulário
  const [campTitulo, setCampTitulo] = useState("");
  const [campDescricao, setCampDescricao] = useState("");
  const [campFoto, setCampFoto] = useState("");
  const [selectGenero, setSelectGenero] = useState("");
  const [stringGenero, setStringGenero] = useState("");

  // Vai buscar o ID do filme ao endereço da página
  const { filmeId } = useParams();

  useEffect(() => {
    const url = "https://trabalho-ai2-backend.onrender.com/filmes/get/" + filmeId;
    
    // Pede ao backend os dados do filme com este ID
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data[0];
          setCampTitulo(data.titulo);
          setCampDescricao(data.descricao);
          setCampFoto(data.foto);
          setSelectGenero(data.generoId);
          setStringGenero(data.genero.descricao);
        }
      })
      .catch(error => { 
        Swal.fire({ icon: 'error', title: 'Erro ao carregar', text: error.message });
      });
  }, [filmeId]);

  // Função que é chamada quando clicamos no botão de atualizar filme
  function SendUpdate(e) {
    e.preventDefault();
    
    // Onde vamos mandar as alterações
    const url = "https://trabalho-ai2-backend.onrender.com/filmes/filme_update/" + filmeId;

    // Dados novos que escrevemos
    const datapost = {
      titulo: campTitulo,
      descricao: campDescricao,
      foto: campFoto,
      generoId: Number(selectGenero)
    };

    // Envia as alterações
    axios.post(url, datapost)
      .then(response => {
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Atualizado!',
            text: 'As alterações foram guardadas com sucesso.',
            confirmButtonColor: '#007bff'
          });
        }
      })
      .catch(error => { 
        Swal.fire({ icon: 'error', title: 'Erro ao atualizar', text: error.message });
      });
  }

  // A parte visual da página 
  return (
    <div className="add-filme-container">
      <h2>Editar Filme</h2>
      <hr />
      <form onSubmit={SendUpdate}>
        <div className="add-filme-linha">
          <label>Título</label>
          <div className="add-filme-input">
            <input type="text" className="form-control" value={campTitulo} onChange={e => setCampTitulo(e.target.value)} required />
          </div>
        </div>

        <div className="add-filme-linha">
          <label>Descrição</label>
          <div className="add-filme-input">
            <textarea className="form-control" value={campDescricao} onChange={e => setCampDescricao(e.target.value)} rows="3" />
          </div>
        </div>

        <div className="add-filme-linha">
          <label>Nome da Foto</label>
          <div className="add-filme-input">
            <input type="text" className="form-control" value={campFoto} onChange={e => setCampFoto(e.target.value)} />
          </div>
        </div>

        <div className="add-filme-linha">
          <label>Género</label>
          <div className="add-filme-input">
            <select className="form-control" value={selectGenero} onChange={e => setSelectGenero(e.target.value)} required>
              <option value={selectGenero}>{stringGenero}</option>
              <option value="1">Ação</option>
              <option value="2">Drama</option>
              <option value="3">Comédia</option>
              <option value="4">Aventura</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Atualizar Filme</button>
      </form>
    </div>
  );
};

export default FilmeEdit;