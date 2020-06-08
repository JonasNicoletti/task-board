import { gql } from "apollo-boost";

export const INIT_STATES = gql`query initStates { states { id name index } }`;
