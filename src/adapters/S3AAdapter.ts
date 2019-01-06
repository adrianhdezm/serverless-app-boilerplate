import { S3 } from 'aws-sdk';

const bucketName = process.env.BUCKET_NAME || '';
const s3 = new S3();

export function getFileSignedUrl(
	className: string,
	objectId: string,
	fileName: string
) {
	const s3Params = {
		Bucket: bucketName,
		Key: `${className}/${objectId}/${fileName}`
	};

	return new Promise((resolve, reject) => {
		s3.getSignedUrl('putObject', s3Params, (err, signedUrl) => {
			if (err || !signedUrl) reject(new Error('INTERNAL SYSTEM ERROR'));

			resolve({
				name: fileName,
				url: signedUrl
			});
		});
	});
}