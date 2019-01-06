import { createAPIResponse } from './utils/formatters';

// Classes Functions
export * from './classes';

// Config Functions
export * from './config';

// Files Functions
export * from './files';

// Base Path
export async function handleGetBasePath() {
	return createAPIResponse(
		200,
		'Just another RESTful Service based on AWS Serverless technologies'
	);
}
