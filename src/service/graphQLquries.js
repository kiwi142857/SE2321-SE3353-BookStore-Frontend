// queries.js
import { gql } from '@apollo/client';

export const GET_BOOKS_BY_NAME = gql`
  query GetBooksByName($name: String!, $pageIndex: Int!) {
    getBookByName(name: $name, pageIndex: $pageIndex) {
      total
      bookList {
        id
        title
        author
        price
        cover
        tags
        sales
        discount
        isbn
        stock
        salesInTime
        coverContent
      }
    }
  }
`;