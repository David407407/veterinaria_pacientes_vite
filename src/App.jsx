import {useState, useEffect} from 'react'
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect( () => {
    const pacientesAlmacenados = JSON.parse(localStorage.getItem("pacientes")) ?? [] // El doble ?? significa "en caso de que el primero sea null haz esto"
    if(pacientesAlmacenados.length > 0 ) {
      setPacientes(pacientesAlmacenados)
    }
  }, []) // Si no tiene nada dentro del arreglo quiere decir que solo se va a ejecutar una sola vez, y es cuando el componente se haya terminado de cargar

  useEffect( () => {
    if(pacientes.length > 0) {
      localStorage.setItem('pacientes', JSON.stringify( pacientes ) );
    }
  }, [pacientes]);

  

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={ pacientes }
          setPacientes={ setPacientes }
          paciente={ paciente }
          setPaciente={ setPaciente }
        />
        <ListadoPacientes
          pacientes={ pacientes }
          setPacientes={ setPacientes }
          setPaciente={ setPaciente }
          // pacientesAlmacenados={pacientesAlmacenados}
        />
      </div>
    </div>
  )
}

export default App
