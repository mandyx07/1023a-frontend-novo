import { useState, useEffect } from 'react'
import './App.css'
type EstudantesType = {
  _id:string,
  nome:string,
  idade:number
}
function App() {
  useEffect(() =>{
    fetch("/api/estudantes")
    .then((response)=> response.json())
    .then((dados)=> setEstudantes(dados))
  
  },[])
  const [estudantes, setEstudantes] = useState<EstudantesType[]>([])
  const[nome, setNome] = useState("")
  const[idade, setIdade] = useState(0)
  function handleSubmit(e:React.FormEvent){
    e.preventDefault ()
    const estudante ={nome, idade}
    fetch("/api/estudantes",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudante)
    })
    .then((response) => response.json())
    .then((dados)=>{
      setEstudantes([...estudantes, dados])
      setNome("")
      setIdade(0)
    })
  }
  return (
    <>
    <h1>Cadastro de Estudantes</h1>
    <form onSubmit={handleSubmit}>
      <input type ='text' placeholder='nome' value ={nome}
      onChange={(e)=> setNome(e.target.value)} />

      <input type ="number" placeholder='idade' value ={idade}
      onChange={(e)=> setIdade(Number(e.target.value))} />
      
      <button type='submit'>Cadastrar</button>
    </form>



     <h1>Lista de Estudantes</h1>
     <div className="conteiner-estudantes">
      {
        estudantes.map((estudante)=>{
          return(
            <div key={estudante._id}>
              <h2>{estudante.nome}</h2>
              <p> Idade: {estudante.idade}</p>
            </div>
          )
        })
      }
     </div>
    
    
    </>
  )
}

export default App
