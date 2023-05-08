import { gql } from '@apollo/client';

//We need our 4 gql mutations we listed out login, add user, ssve book , and remove book

export const LOGIN_USER = gql `
    mutation loginUser($email: String!, password: String!){
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
                # email
                # savedBooks {
                #     bookId
                #     authors
                #     description
                #     title
                #     image
                #     link
                # } not needed ?
            }
        }
    }
`

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const SAVE_BOOK = gql `
    mutation saveBook($userId: ID!, $book: BookInput!){
        saveBook(userId: $userId, book: $book) {
            _id
            username
            email 
            bookCount
            savedBooks{
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`

export const REMOVE_BOOK = gql `
    mutation removeBook($userId: ID!, $book: BookInput!){
        removeBook(email: $email, password: $password) {
            _id
            username
            email 
            bookCount
            savedBooks{
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`