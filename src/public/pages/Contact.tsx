import { PublicLayout } from '../layout'

export const Contact = () => {
  return (
    <PublicLayout
      style={{
        backgroundImage: `url(/background_day_ver_1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      title="Contactanos" 
      navClassName="bg-white bg-opacity-50 text-black text-md"
      linkClassName="text-md font-bold text-center"
    >
      <div className="flex flex-col items-center justify-center p-8 w-full min-w-96 sm:w-1/2">
        <form className="flex flex-col items-center justify-center w-full p-8 bg-white rounded-lg shadow-lg gap-12">
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm font-bold text-gray-700">Nombre</label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
              type="text"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm font-bold text-gray-700"> Correo </label>
            <input className="px-3 py-2 border border-gray-300 rounded-md" type="email" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm font-bold text-gray-700">Mensaje</label>
            <textarea className="px-3 py-2 border border-gray-300 rounded-md" rows={5} />
          </div>
          <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700">
            Enviar
          </button>
        </form>
      </div>

    </PublicLayout>
  )
}
