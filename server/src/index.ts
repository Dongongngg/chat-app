import { GraphQLServer } from 'graphql-yoga';

interface IMessage {
	id: number;
	user: string;
	content: string;
}

let messages: IMessage[] = [];

const typeDefs = `
  type Query {
    hello(name: String): String!
    messages: [Message!]
  }
  type Mutation{
      postMessage(user:String!, content:String!): ID!
  }
  type Message{
    id: ID!
    user: String!
    content: String!
}
`;

const resolvers = {
	Query: {
		hello: (): string => 'Hello  World',
		messages: (): IMessage[] => messages,
	},

	Mutation: {
		postMessage: (_: void, args: { user: string; content: string }): number => {
			const id: number = messages.length;
			messages.push({
				id: id,
				user: args.user,
				content: args.content,
			});
			return id;
		},
	},
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => console.log(`Server is running on http://localhost:${port}`));
