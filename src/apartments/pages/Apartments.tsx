import { ApartmentsLayout } from '../layout/ApartmentsLayout'

export const Apartments = () => {
  return (
    <ApartmentsLayout title="Departamentos">
      <div className="flex flex-col gap-4">
        <p className="text-center text-2xl font-bold">
          ver Departamentos
        </p>
        <p className="text-center text-2xl font-bold">
          reservar Departamento
        </p>
        <p className="text-center text-2xl font-bold">
          ver reservas
        </p>
        <p className="text-center text-2xl font-bold">
          comprar Departamento
        </p>
      </div>
    </ApartmentsLayout>
  )
}
