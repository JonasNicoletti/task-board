import { gql } from "apollo-boost";

export const INIT_STATES = gql`query initStates { states { id name index } }`;
export const GET_TASKS = gql`query getTasks { tasks { id title category { id name color } state {id name index} } }`;
