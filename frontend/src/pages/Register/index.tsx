import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql'
import { Button, Grid, Loading, TextField, Typography } from '../../components'
import { validation } from './yup'
import {
  GridStyled,
  LinkStyled,
  LockOutlinedIconStyled,
  TypographyStyled
} from './styles'

export const Register = () => {
  const navigate = useNavigate()

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      toast.success('Cadastro efetuado com sucesso!')
      navigate('/home')
    },
    onError: error => {
      if (error.message === 'Usuário já cadastrado') {
        toast.error('Endereço de e-mail já cadastrado.')
      }
      if (error.message !== 'Usuário já cadastrado') {
        toast.error('Ocorreu um erro inesperado, tente novamente.')
      }
    }
  })

  const { handleSubmit, register, control } = useForm({
    resolver: yupResolver(validation)
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSubmit = data => {
    createUser({
      variables: {
        name: data.name,
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
        <Typography variant="h6">Cadastro</Typography>
      </GridStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridStyled item>
          <Controller
            name="name"
            control={control}
            render={({ field: { value }, fieldState: { error } }) => (
              <TextField
                required
                fullWidth
                error={!!error}
                value={value || ''}
                label="Nome completo"
                {...register('name')}
                helperText={error?.message}
              />
            )}
          />
        </GridStyled>
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
            Cadastrar
          </Button>
        </Grid>
      </form>
      <Grid justifySelf="left">
        <LinkStyled to="/">
          <TypographyStyled>Já possui uma conta? Acesse</TypographyStyled>
        </LinkStyled>
      </Grid>
    </Grid>
  )
}
