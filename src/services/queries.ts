import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

  export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
    	weight
      stats {
        base_stat
        stat {
          name
        }
      }
      base_experience
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      held_items {
        item {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`