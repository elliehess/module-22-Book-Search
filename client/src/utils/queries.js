import { gql } from '@apollo/client';
//bring in the me query from our typeDefs
export const GET_ME = gql `
    query me($userId: ID!) {
        me($userId: ID!) {
        _id
        username
        email
        # password
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
            }
        }

    }
`