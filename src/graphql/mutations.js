import { gql } from "apollo-boost";

export const INIT_STATES = gql`
  mutation createTask($title: String!, $description: String, $category: {$id: number, name: String!}) {
    createTask(
      task: {
        title: "title"
        description: "description"
        category: { name: "category" }
      }
    ) {
      task {
        id
        createdAt
      }
    }
  }
`;
