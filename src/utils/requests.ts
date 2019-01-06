import { request } from 'https';
import { parse } from 'url';

export function cloudFormationRequest(
	event: AWSLambda.CloudFormationCustomResourceEvent,
	context: AWSLambda.Context,
	status: string,
	data: object = {},
	err?: Error
) {
	const reason = err ? err.message : '';

	const requestBodyObject = {
		Data: data,
		LogicalResourceId: event.LogicalResourceId,
		PhysicalResourceId: context.logStreamName,
		Reason: `${reason} See details in CloudWatch Log: ${context.logStreamName}`,
		RequestId: event.RequestId,
		StackId: event.StackId,
		Status: status
	};

	const requestBody = JSON.stringify(requestBodyObject);

	const requestURL = parse(event.ResponseURL);

	const options = {
		headers: {
			'content-length': requestBody.length,
			'content-type': ''
		},
		hostname: requestURL.hostname,
		method: 'PUT',
		path: requestURL.path,
		port: 443
	};
	return new Promise((resolve, reject) => {
		const req = request(options, reponse => {
			resolve(reponse);
		});

		req.on('error', error => {
			reject(error);
		});

		req.write(requestBody);
		req.end();
	});
}
