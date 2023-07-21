import * as yup from 'yup'

export const validation = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório')
    .max(100, 'Limite de caracteres atingido'),
  email: yup
    .string()
    .required('Campo obrigatório')
    .max(100, 'Limite de caracteres atingido')
    .email('Email inválido'),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'A senha precisa conter no mínimo 8 caracteres')
    .max(20, 'A senha precisa conter no máximo 20 caracteres')
})
