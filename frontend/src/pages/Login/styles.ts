import styled from 'styled-components'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, Grid, Typography } from '../../components'

export const GridStyled = styled(Grid)`
  margin-bottom: 24px !important;
`

export const LockOutlinedIconStyled = styled(LockOutlinedIcon)`
  padding: 10px;
  border-radius: 50%;
  background: #1976d2;
  margin-bottom: 8px;

  path {
    fill: #ffffff;
  }
`

export const LinkStyled = styled(Link)`
  color: #1976d2;
  text-decoration: none;
`

export const TypographyStyled = styled(Typography)`
  color: #1976d2;
  text-decoration: none;
  margin-top: 8px !important;
`
