import { Button } from '@nextui-org/react'

interface BackButtonProps {
  onGoBack: () => void
}

export const BackButton = ( { onGoBack }: BackButtonProps ) => {
  return (
    <Button
      color="primary"
      variant="shadow"
      onClick={ onGoBack }
      className="absolute cursor-pointer top-24 left-12 text-lg z-20"
    >
      Volver Atras
    </Button>
  )
}
