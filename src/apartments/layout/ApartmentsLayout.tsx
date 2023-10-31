interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
}

export const ApartmentsLayout = ( { title, children } : Props ) => {
  return (
    <div className="apartments-layout__container">
      <h1 className="text-center text-3xl font-bold"> { title } </h1>
      { children }
    </div>
  )
}
