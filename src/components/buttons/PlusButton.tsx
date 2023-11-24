import { Button } from '@nextui-org/react'
import { PlusIcon } from './PlusIcon'

interface PlusButtonProps {
  onClick?: () => void
}

export const PlusButton = ( { onClick } : PlusButtonProps ) => {
  return (
    <Button
      color="primary"
      endContent={ <PlusIcon /> }
      onClick={ onClick }
    >
      Add New
    </Button>
  )
}
