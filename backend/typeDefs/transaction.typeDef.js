const transactionTypeDef = `#graphql
	#! means cannot be null (mandatory)
	type Transaction{
		_id: ID!
		userId: ID!
		description: String!
		paymentType: String!
		category: String!
		amount: Float!
		location: String
		date: String!
	}

	#queries (GET) for users and what to expect in the response (after the :)
	type Query{
		transactions: [Transaction!]
		transaction(transactionId: ID!): Transaction
	}

	#mutations (POST, PATCH, DELETE) for users and what to expect in the response (after the :)
	type Mutation{
		createTransation(input: CreateTransactionInput!): Transaction!
		updateTransation(input: UpdateTransactionInput!): Transaction!
		deleteTransation(transactionId: ID!): Transaction!
	}

	input CreateTransactionInput{
		description: String!
		paymentType: String!
		category: String!
		amount: Float!
		date: String!
		location: String
	}

	input UpdateTransactionInput{
		transactionId: ID!
		description: String
		paymentType: String
		category: String
		amount: Float
		date: String
		location: String
	}
`;

export default transactionTypeDef;
