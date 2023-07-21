import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($email: String!, $password: String!) {
    getUser(email: $email, password: $password) {
      id
      email
      password
    }
  }
`
