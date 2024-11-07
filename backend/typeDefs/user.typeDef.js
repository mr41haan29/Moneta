const userTypeDef = `#graphql
	#! means cannot be null (mandatory)
	type User{
		_id: ID!
		username: String!
		email: String!
		password: String!
		profilePicture: String
		gender: String!
	}

	#queries (GET) for users and what to expect in the response (after the :)
	type Query{
		users: [User!] #get all users
		authUser: User #get authenticated user
		user(userId: ID!): User #get a specific user by the userID
 	}

	#mutations (POST, PATCH, DELETE) for users and what to expect in the response (after the :)
	type Mutation{
		signUp(input: SignUpInput!): User!
		login(input: LoginInput!): User!
		logout: LogoutResponse!
	}

	#custom inputs and response for mutations 
	input SignUpInput{
		name: String!
		username: String!
		password: String!
		gender: String!
	}

	input LoginInput{
		username: String!
		password: String!
	}

	type LogoutResponse{
		message: String!
	}

`;

export default userTypeDef;
