import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../../graphql'
import { Button, Grid, Loading, TextField, Typography } from '../../components'
import { validation } from './yup'
import {
  GridStyled,
  LinkStyled,
  LockOutlinedIconStyled,
  TypographyStyled
} from './styles'

export const Login = () => {
  const navigate = useNavigate()

  const { handleSubmit, register, control } = useForm({
    resolver: yupResolver(validation)
  })

  const [getUser, { loading }] = useLazyQuery(GET_USER, {
    onCompleted: () => {
      toast.success('Login efetuado com sucesso!')
      navigate('/home')
    },
    onError: error => {
      if (error.message === 'Senha incorreta') {
        toast.error('Senha incorreta, tente novamente.')
      }

      if (error.message === 'Usuário não encontrado') {
        toast.error('Usuário não encontrado.')
      }

      if (
        error.message !== 'Senha incorreta' &&
        error.message !== 'Usuário não encontrado'
      ) {
        toast.error('Ocorreu um erro inesperado, tente novamente.')
      }
    }
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSubmit = data => {
    return getUser({
      variables: {
        email: data.email,
        password: data.password
      }
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Grid container maxWidth="sm" display="grid" marginTop={2}>
      <Grid item>
        <LockOutlinedIconStyled />
      </Grid>
      <GridStyled item>
        <Typography variant="h6">Login</Typography>
      </GridStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridStyled item>
          <Controller
            name="email"
            control={control}
            render={({ field: { value }, fieldState: { error } }) => (
              <TextField
                required
                fullWidth
                label="E-mail"
                error={!!error}
                value={value || ''}
                {...register('email')}
                helperText={error?.message}
              />
            )}
          />
        </GridStyled>
        <GridStyled item>
          <Controller
            name="password"
            control={control}
            render={({ field: { value }, fieldState: { error } }) => (
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                error={!!error}
                value={value || ''}
                {...register('password')}
                helperText={error?.message}
              />
            )}
          />
        </GridStyled>
        <Grid item>
          <Button fullWidth variant="contained" type="submit">
            Acessar
          </Button>
        </Grid>
      </form>
      <Grid justifySelf="left">
        <LinkStyled to="cadastro">
          <TypographyStyled>Não possui uma conta? Cadastre-se</TypographyStyled>
        </LinkStyled>
      </Grid>
    </Grid>
  )
}
