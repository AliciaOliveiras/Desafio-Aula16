import axios from "axios";
import { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function HomePage(){

    const [alunos, setAlunos] = useState([]);

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [curso, setCurso] = useState("");
    const [bimestre, setBimestre] = useState("");

    const navigate = useNavigate()
    

    async function getAlunos() {
        try {
          const response = await axios.get("https://api-aluno.vercel.app/aluno");
          setAlunos(response.data);
        } catch (error) {
          alert("Erro ao buscar dados.");
        }
      };

      async function deleteAluno(id){
    
        try{ 
          await axios.delete(`https://api-aluno.vercel.app/aluno/${id}`);
          getAlunos();
        } catch (error){
          alert("Erro em deletar aluno")
        }
      }

      useEffect(() => {
        getAlunos();
      }, []);

    return (
        <div>
            <h1> Home Page </h1>
             <ul>
                {alunos.map((aluno) => (
                    <li key={aluno._id}>
                        <h3>{aluno.nome}</h3>
                        <p> {aluno.matricula} </p>
                        <p> {aluno.curso} </p>
                        <p> {aluno.bimestre} </p>
                        <button onClick={() => navigate(`/form/${aluno._id}`)}> Editar </button>
                        <button onClick={() => deleteAluno(aluno._id)}> Apagar </button>
                    </li>
                ))}
            </ul> 
            
            <button onClick={() => navigate("/form")}> Ir para formulário </button>
        </div>
    )
};