import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_CLIENT_LIST = gql`
  query GET_CLIENT_LIST($skip: Int!, $take: Int!) {
    clients(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        email
      }
      totalItems
    }
  }
`;

const PAGE_SIZE = 10;

export function ClientList({ onSelectClient }) {
  const { data, error, loading, fetchMore } = useQuery(GET_CLIENT_LIST, {
    fetchPolicy: "cache-and-network",
    variables: {
      skip: 0,
      take: PAGE_SIZE,
    },
  });

  const handleSelectClient = (client) => onSelectClient?.(client.id);

  const clients = data?.clients.items ?? [];

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        skip: data.clients.items.length,
        take: PAGE_SIZE,
      },
      updateQuery: (result, { fetchMoreResult }) => {
        if (!fetchMoreResult) return result;

        return {
          ...result,
          clients: {
            ...result.clients,
            items: result.clients.items.concat(fetchMoreResult.clients.items),
            totalItems: fetchMoreResult.clients.totalItems,
          },
        };
      },
    });
  };
  console.log(clients);

  if (error)
    return (
      <section>
        {console.log("Aqui esta", error)}
        <strong>Erro ao buscar os clientes</strong>
      </section>
    );

  if (loading && !data)
    return (
      <section>
        <p>Carregando...</p>
      </section>
    );

  return (
    <section>
      <ul>
        {clients.map((client) => (
          <li key={client.id} onClick={handleSelectClient(client)}>
            <p>{client.name}</p>
            <p>{client.email}</p>
          </li>
        ))}
      </ul>
      <button type="button" disabled={loading} onClick={handleLoadMore}>
        Carregar
      </button>
    </section>
  );
}
