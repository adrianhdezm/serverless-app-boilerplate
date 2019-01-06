import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { cloudFormationRequest } from './utils/requests';

export async function handleCognitoPreSignup(
	event: AWSLambda.CognitoUserPoolEvent
) {
	event.response = { autoConfirmUser: true };
	return event;
}

export async function handleUserPoolClientSettings(
	event: AWSLambda.CloudFormationCustomResourceEvent,
	context: AWSLambda.Context
) {
	try {
		switch (event.RequestType) {
			case 'Create':
			case 'Update':
				const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

				const data = await cognitoIdentityServiceProvider
					.updateUserPoolClient({
						AllowedOAuthFlows: event.ResourceProperties.AllowedOAuthFlows,
						AllowedOAuthFlowsUserPoolClient:
							event.ResourceProperties.AllowedOAuthFlowsUserPoolClient ===
							'true',

						AllowedOAuthScopes: event.ResourceProperties.AllowedOAuthScopes,
						ClientId: event.ResourceProperties.UserPoolClientId,

						CallbackURLs: [event.ResourceProperties.CallbackURL],
						ExplicitAuthFlows: event.ResourceProperties.ExplicitAuthFlows,
						SupportedIdentityProviders:
							event.ResourceProperties.SupportedIdentityProviders,
						UserPoolId: event.ResourceProperties.UserPoolId
					})
					.promise();

				const updateResponce = await cloudFormationRequest(
					event,
					context,
					'SUCCESS',
					data
				);
				return updateResponce;

			case 'Delete':
				const deleteResponce = await cloudFormationRequest(
					event,
					context,
					'SUCCESS'
				);
				return deleteResponce;
			default:
				throw new Error('RequestType not supported');
		}
	} catch (error) {
		await cloudFormationRequest(event, context, 'FAILED', {}, error);
		throw error;
	}
}

export async function handleCreateFirstUser(
	event: AWSLambda.CloudFormationCustomResourceEvent,
	context: AWSLambda.Context
) {
	try {
		switch (event.RequestType) {
			case 'Create':
			case 'Update':
				const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

				const data = await cognitoIdentityServiceProvider
					.signUp({
						ClientId: event.ResourceProperties.ClientId,
						Password: event.ResourceProperties.Password,
						Username: event.ResourceProperties.Username
					})
					.promise();

				const updateResponce = await cloudFormationRequest(
					event,
					context,
					'SUCCESS',
					data
				);
				return updateResponce;

			case 'Delete':
				const deleteResponce = await cloudFormationRequest(
					event,
					context,
					'SUCCESS'
				);
				return deleteResponce;
			default:
				throw new Error('RequestType not supported');
		}
	} catch (error) {
		await cloudFormationRequest(event, context, 'FAILED', {}, error);
		throw error;
	}
}
