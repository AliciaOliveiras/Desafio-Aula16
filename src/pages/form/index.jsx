import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function FormPage(){

    const [alunos, setAlunos] = useState([]);
    const [aluno, setAluno] = useState({});

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [curso, setCurso] = useState("");
    const [bimestre, setBimestre] = useState("");

    const AlunoId = useParams();

    function limparCampos(){
        setId("");
        setNome("");
        setMatricula("");
        setCurso("");
        setBimestre("");
      }

      async function getAluno(){
        try {
          const response = await axios.get(`https://api-aluno.vercel.app/aluno/${AlunoId.id}`);
          setAluno(response.data);
          preencheCampos(response.data)
        } catch (error) {
          alert("Erro ao buscar dados.");
        }
      }

       async function getAlunos() {
        try {
          const response = await axios.get("https://api-aluno.vercel.app/aluno/");
          setAlunos(response.data);
        } catch (error) {
          alert("Erro ao buscar dados.");
        }
      };  

      async function addAluno(event){
        event.preventDefault();
    
        try{
          await axios.post("https://api-aluno.vercel.app/aluno", {
            nome: nome,
            matricula: matricula,
            curso: curso,
            bimestre: bimestre,
        });
        limparCampos();
        getAlunos();
    
        } catch (error) {
          alert("Erro a cadastrar novo aluno")
        }
      }

      function preencheCampos(aluno){
        setId(aluno._id);
        setNome(aluno.nome);
        setMatricula(aluno.matricula);
        setCurso(aluno.curso);
        setBimestre(aluno.bimestre);
      }

      async function editAluno(){
        event.preventDefault();
        try{
          await axios.put(`https://api-aluno.vercel.app/aluno/${AlunoId.id}`, {
            nome: nome,
            matricula: matricula,
            curso: curso,
            bimestre: bimestre,
          });
          limparCampos();
        } catch (error){
          alert ("Erro ao tentar editar aluno.")
        }
      }
    
      useEffect(() => {

        if (AlunoId.id !== undefined){
           getAluno();
        }
      }, []);

    return (
        <div>
            <h1> Form Page </h1>
            
            <form onSubmit={id ? editAluno : addAluno}>

                <input type="text"
                placeholder='Informe seu nome'
                value={nome}
                onChange={(event) => setNome(event.target.value)}/>

                <input type="text" 
                placeholder='Informe sua matricula'
                value={matricula}
                onChange={(event) => setMatricula(event.target.value)}/>
                
                <input type="text" 
                placeholder='Informe seu curso'
                value={curso}
                onChange={(event) => setCurso(event.target.value)}/>

                <input type="text" 
                placeholder='Informe seu bimestre'
                value={bimestre}
                onChange={(event) => setBimestre(event.target.value)}/>

                <input type="submit" />

            </form>

           <Link to="/"> Voltar para Home</Link>
        </div>
    )
};