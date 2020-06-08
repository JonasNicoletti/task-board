import { gql } from "apollo-boost";

export const INIT_STATES = gql`{ states { id name index } }`;
