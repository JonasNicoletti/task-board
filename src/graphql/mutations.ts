import { gql } from "apollo-boost";


export const CREATE_TASK = gql`
  mutation createTask($task: CreateTaskDTO!) {
    createTask(task: $task) {
      task 
        { 
          id 
          title 
          createdAt
          category 
            { 
              id 
              name 
              color 
            } 
          state 
            {
              id 
              name 
              index
            }
        }
    }
  }
`;
