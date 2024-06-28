// -- gql setup --//
import { GQL_SERVER } from '@/conf/config';
import useSession from '@/hooks/use-session';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';

const GQLProvider = ({ children }: { children: React.ReactNode }) => {
	const gqlUrl = GQL_SERVER;
	const httpLink = createHttpLink({
		uri: gqlUrl
	});
	const { session } = useSession();

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem('authToken');

		return {
			headers: {
				Authorization: token ? `Bearer ${session.authToken}` : ''
			}
		};
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache({
			addTypename: false //https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
		})
	});

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GQLProvider;
