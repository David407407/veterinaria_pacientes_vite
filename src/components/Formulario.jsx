import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ( { pacientes, setPacientes, paciente, setPaciente } ) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false)

  useEffect( () => {
    if( Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
    }
  }, [paciente] )

  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return fecha + random
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if([nombre, propietario, email, alta, sintomas].includes('')) {
      setError(true);
      return 
    } 

    setError(false);
    // Modifica el paciente que se quiere editar
    if(paciente.hasOwnProperty("id") === true) {
      // Crea un nuevo objeto con los valores del formulario y le asignamos el mismo id
      const pacienteActualizado = {
        nombre, 
        propietario, 
        email, 
        alta, 
        sintomas,
        id: paciente.id
      }

      // Crea un nuevo arreglo de pacientes en el cual sustituimos el paciente anterior por el nuevo pero ya editado
      const pacientesActualizados = pacientes.map( item => item.id === paciente.id ? pacienteActualizado : item );
      setPacientes(pacientesActualizados) // Le damos a pacientes el nuevo areglo ya modificado
      setPaciente({}); // Eliminamos el paciente editado de la memoria
    } else { // Sino existe el paciente creamos uno nuevo
      // Objeto de Paciente
      const objetoPaciente = {
        nombre, 
        propietario, 
        email, 
        alta, 
        sintomas,
        id: generarId()
      }

      setPacientes([...pacientes, objetoPaciente])
    }

    // Aqui devolvemos los valores del formulario a cadenas vacias
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Añade Pacientes y {''}
          <span className="text-indigo-600 font-bold ">Administralos</span>
        </p>

        <form
          onSubmit={ handleSubmit } 
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
          {error === true && <Error> <p>Todos los campos son obligatorios</p> </Error> }
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
            <input 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text"
              id="mascota"
              placeholder="Nombre de la Mascota"
              value={nombre}
              onChange = { (e) => setNombre(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
            <input 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text"
              id="propietario"
              placeholder="Nombre del Propietario"
              value={propietario}
              onChange = { (e) => setPropietario(e.target.value) }
            />
          </div>
          
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
            <input 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="email"
              id="email"
              placeholder="Email del Propietario"
              value={email}
              onChange = { (e) => setEmail(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
            <input 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="date"
              id="alta"
              value={alta}
              onChange = { (e) => setAlta(e.target.value) }
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas</label>
            <textarea 
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe los Síntomas"
              value={sintomas}
              onChange = { (e) => setSintomas(e.target.value) }
            />
          </div>

          <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md"
            value={paciente.id ? "Editar Paciente" : "Agregar Paciente"} 
          />
          
        </form>
    </div>
  )
}

export default Formulario