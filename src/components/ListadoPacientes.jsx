import Paciente from "./Paciente"

const ListadoPacientes = ( {pacientes, setPacientes, setPaciente} ) => {
  
  // Esta funcion elimina el paciente
  const eliminarPaciente = pacienteActual => { // Le pasamos el paciente sobre el cual hicimos click
    Swal.fire({ // Muestra un mensaje sobre si queremos eliminar al paciente
      title: 'Quieres eliminar este paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#cb0000',
      confirmButtonText: 'Eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
        )

        const pacientesActualizado = pacientes.filter( item => item.id !== pacienteActual.id ) // Creamos un nuevo arreglo excluyendo el que queremos eliminar
        setPacientes(pacientesActualizado) // Modificamos los pacientes con el arreglo que acabamos de crear
      }
    })  
  }



  // if(pacientesAlmacenados.length > 0) {
  //   setPacientes(pacientesAlmacenados)
  // }

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

        { pacientes && pacientes.length ? (
          <>
            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className="text-indigo-600 font-bold">pacientes y citas</span>
            </p> 
            
            { pacientes.map( (paciente) => (
              <Paciente
                key={ paciente.id }
                paciente={paciente}
                setPaciente={setPaciente}
                eliminarPaciente={eliminarPaciente}
              />
            )) }
          </> )
          : 
          <>
            <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {''}
              <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
            </p>
          </>
        }

    </div>
  )
}

export default ListadoPacientes