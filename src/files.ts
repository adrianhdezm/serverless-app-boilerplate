import { getFileSignedUrl } from './adapters/S3AAdapter';
import { createAPIResponse } from './utils/formatters';
import { validClassName, validObjectId } from './utils/validators';
// UploadFile
export async function handleGetUploadUrl(
	event: AWSLambda.APIGatewayProxyEvent
) {
	const className: string = event.pathParameters!.className || '';
	const objectId: string = event.pathParameters!.objectId || '';
	const fileName: string = event.pathParameters!.fileName || '';

	try {
		if (!fileName || !validClassName(className) || !validObjectId(objectId))
			throw new Error('INVALID INPUT');

		const data = await getFileSignedUrl(className,objectId,fileName);

		return createAPIResponse(200, data);
	} catch (error) {
		return createAPIResponse(500, error);
	}
}