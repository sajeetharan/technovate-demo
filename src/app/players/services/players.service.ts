import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { player } from "../interfaces/player.interface";
import { Observable } from "rxjs";
import { Apollo, gql } from "apollo-angular";
const get_players = gql`
  query {
    players {
      items {
        id
        name
        type
        city
        country
        picture_link
      }
      endCursor
      hasNextPage
    }
  }
`;

const get_player = gql`
  query player_by_pk($_partitionKeyValue: String!, $id: ID!) {
    player_by_pk(_partitionKeyValue: $_partitionKeyValue, id: $id) {
      id
      name
      type
      city
      country
      picture_link
    }
  }
`;

const post_createplayer = gql`
  mutation ($item: CreateplayerInput!) {
    createplayer(item: $item) {
      id
      name
      type
      city
      country
      picture_link
    }
  }
`;

const post_updateplayer = gql`
  mutation updateplayer(
    $_partitionKeyValue: String!
    $id: ID!
    $item: UpdateplayerInput
  ) {
    updateplayer(
      _partitionKeyValue: $_partitionKeyValue
      id: $id
      item: $item
    ) {
      id
      name
      type
      city
      country
      picture_link
    }
  }
`;

const post_deleteplayer = gql`
  mutation deleteplayer($_partitionKeyValue: String!, $id: ID!) {
    deleteplayer(_partitionKeyValue: $_partitionKeyValue, id: $id) {
      id
      name
      type
      city
      country
      picture_link
    }
  }
`;

const get_suggestedplayers = gql`
  query ($filter: playerFilterInput!) {
    players(filter: $filter) {
      items {
        id
        name
        type
        city
        country
        picture_link
      }
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class playersService {
  private baseUrl: string = "";
  private limit: number = 6;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getplayers(): Observable<any> {
    return this.apollo.watchQuery<any>({ query: get_players }).valueChanges;
  }

  getplayerById(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: get_player,
      variables: { _partitionKeyValue: id, id: id },
    }).valueChanges;
  }

  getSuggestions(term: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: get_suggestedplayers,
      variables: { filter: { id: { contains: term } } },
    }).valueChanges;
  }

  addplayer(player: player): Observable<any> {
    return this.apollo.mutate({
      mutation: post_createplayer,
      variables: {
        item: {
          id: player.id,
          name: player.name,
          country: player.country,
          wikipedia_link: player.city,
          picture_link: player.picture_link,
        },
      },
    });
  }

  updateplayer(player: player): Observable<any> {
    return this.apollo.mutate({
      mutation: post_updateplayer,
      variables: {
        _partitionKeyValue: player.id,
        id: player.id,
        item: {
          id: player.id,
          name: player.name,
          country: player.country,
          wikipedia_link: player.city,
          picture_link: player.picture_link,
        },
      },
    });
  }

  deleteplayer(player: player): Observable<any> {
    return this.apollo.mutate({
      mutation: post_deleteplayer,
      variables: {
        _partitionKeyValue: player.id,
        id: player.id,
      },
    });
  }
}
