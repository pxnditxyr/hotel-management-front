import './unexpected-page.styles.css'

interface UnexpectedErrorProps {
  error?: string
  code?: number
}

export const UnexpectedError = ( { error, code = 404 }: UnexpectedErrorProps ) => {
  return (
    <div className="container">
      <div className="text">
        <div className="text-4xl font-bold" > Error Inesperado </div>
        <h1> { code } </h1>
        <hr />
        <div
          className="text-2xl font-bold"
        > { error || 'Parece que algo salio mal, por favor intenta nuevamente' } </div>
      </div>
      <div className="astronaut">
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className="src" 
        />
      </div>
    </div>
  )
}
