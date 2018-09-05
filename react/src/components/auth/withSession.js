import React from "react";
import gql from 'graphql-tag'
import { Query } from "react-apollo";


const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      // console.log(data);
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default withSession;



const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        name
      }
    }
  }
`;