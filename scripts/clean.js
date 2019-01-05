#!/usr/bin/env node

const util = require('util');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
const {
	getProjectName,
	getBucketName,
	checkBucketExists
} = require('../config/utils');

// Main function
(async function() {
	try {
		console.log(
			chalk.yellow('\nDeleting the package bucket ...'.toUpperCase())
		);
		const bucketName = await getBucketName();
		const bucketExists = await checkBucketExists(bucketName);
		if (bucketExists) await exec(`aws s3 rb s3://${bucketName} --force`);

		console.log(chalk.yellow('\nDeleting the stack ...'.toUpperCase()));
		const stackName = getProjectName();
		await exec(
			`aws cloudformation delete-stack --stack-name ${stackName}`
		);
	} catch (error) {
		console.log(chalk.red(error));
		process.exit(1);
	}
})();
