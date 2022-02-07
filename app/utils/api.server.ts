import { createAuthLink, AUTH_TYPE } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import {
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
  from,
  split,
} from '@apollo/client';
import config from './awsExports';

const httpLink = createHttpLink({ uri: config.aws_appsync_graphqlEndpoint });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    createAuthLink({
      url: config.aws_appsync_graphqlEndpoint,
      region: config.aws_appsync_region,
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: config.aws_appsync_apiKey,
      },
    }),
    split(
      op => {
        const { operation } = op.query.definitions[0] as any;
        if (operation === 'subscription') {
          return false;
        }
        return true;
      },
      httpLink,
      createSubscriptionHandshakeLink(
        {
          auth: {
            type: AUTH_TYPE.API_KEY,
            apiKey: config.aws_appsync_apiKey,
          },
          url: config.aws_appsync_graphqlEndpoint,
          region: config.aws_appsync_region,
        },
        httpLink
      )
    ),
  ]),
});
