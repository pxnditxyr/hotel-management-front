import { PublicLayout } from '../layout'

export const About = () => {
  return (
    <PublicLayout
      style={{
        backgroundImage: `url(/background_day_ver_2.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      title="Acerca de Nosotros" 
      navClassName="bg-white bg-opacity-50 text-black text-md"
      linkClassName="text-md font-bold text-center"
    >
      <div className="flex items-center justify-center w-full h-full gap-8 p-8">
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-8 gap-8 max-w-2xl">
          <h1 className="text-4xl font-bold text-center text-gray-800"> Acerca de Nosotros </h1>
          <p className="text-justify text-gray-800 text-md">
            Somos un equipo diverso y apasionado de arquitectos, diseñadores, ingenieros y profesionales comprometidos con la creación de un legado arquitectónico y cultural en Bolivia.
            Valoramos la colaboración, la creatividad y la responsabilidad social.
            Estamos dedicados a transformar la visión de Torre Nairobi en una realidad tangible que enriquezca la vida de las personas y de la ciudad en su conjunto.
            En la Torre Nairobi, la modernidad se fusiona con la tradición, la innovación coexiste con la sostenibilidad y la comunidad encuentra un hogar en medio del ajetreo urbano.
            Somos más que una estructura; somos un movimiento hacia un futuro arquitectónico y cultural vibrante y consciente.
          </p>
        </div>
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-8 gap-8 max-w-1/2">
          <h1 className="text-4xl font-bold text-center text-gray-800"> Misión </h1>
          <p className="text-justify text-gray-800 text-md">
            La misión de Torre Nairobi es triple:
            Innovación Arquitectónica:
            Buscamos crear un espacio urbano que desafíe los límites tradicionales de la arquitectura.
            Queremos inspirar a las generaciones venideras de arquitectos y urbanistas a explorar nuevas formas de diseño que combinen la funcionalidad con la belleza estética.
            Catalizador Cultural:
            Torre Nairobi se compromete a ser un centro de actividad cultural, promoviendo y preservando la rica herencia de Bolivia.
            A través de galerías de arte, espacios para presentaciones y eventos temáticos, esperamos celebrar la diversidad cultural de la región.
            Liderazgo Sostenible:
            Reconocemos nuestra responsabilidad con el entorno y la sociedad.
            Nuestra torre está diseñada con los más altos estándares de sostenibilidad, desde sistemas de energía renovable hasta prácticas de construcción eco-amigables.
            Buscamos establecer un ejemplo de cómo la arquitectura puede coexistir en armonía con la naturaleza
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl p-8 gap-8 max-w-2xl">
          <h1 className="text-4xl font-bold text-center text-gray-800"> Visión </h1>
          <p className="text-justify text-gray-800 text-md">
            La visión de Torre Nairobi es ser más que un simple rascacielos; aspira a convertirse en un símbolo de la identidad boliviana y en un faro de innovación para el desarrollo sostenible en el país.
            La torre no solo es una manifestación de destreza arquitectónica, sino también un lugar donde convergen la comunidad, la cultura y la conciencia ambiental.
          </p>
        </div>
      </div>
      </div>
    </PublicLayout>
  )
}
