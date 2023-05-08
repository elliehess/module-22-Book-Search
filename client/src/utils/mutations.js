import { gql } from '@apollo/client';

//We need our 4 gql mutations we listed out login, add user, ssve book , and remove book

export const LOGIN_USER = gql `
    mutation login($email: String!, password: String!){
        login(email: $email, password: $password): Auth
    }
`