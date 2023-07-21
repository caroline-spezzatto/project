import { CircularProgress } from '@mui/material'
import { WrapperStyled } from './styles'

export const Loading = () => {
  return (
    <WrapperStyled>
      <CircularProgress size={60} />
    </WrapperStyled>
  )
}
