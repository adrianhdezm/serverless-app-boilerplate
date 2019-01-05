import axios from 'axios';

const url = 'http://checkip.amazonaws.com/';

function createAPIResponse(statusCode: number, data: any) {
	return {
		body: JSON.stringify(data),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json'
		},
		statusCode
	};
}

export async function handleHelloWorld() {
	try {
		const ret = await axios(url);
		return createAPIResponse(200, {
			location: ret.data.trim(),
			message: 'hello world'
		});
	} catch (error) {
		return createAPIResponse(500, {
			message: error.toString()
		});
	}
}
