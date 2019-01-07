// Set the project paths

const SAM_FOLDER_PATH = `${__dirname}/../aws-sam`;
const CFN_STACKS_PATH = `${__dirname}/../aws-cfn-stacks`;

exports.STATIC_ASSETS_PATH = `${__dirname}/../public`;
exports.SAM_FOLDER_PATH = SAM_FOLDER_PATH;
exports.PACKAGE_FOLDER_PATH = `${SAM_FOLDER_PATH}/package`;
exports.BUILD_FOLDER_PATH = `${SAM_FOLDER_PATH}/build`;
exports.BUILDED_CFN_STACK_TEMPLATE_PATH = `${SAM_FOLDER_PATH}/build/template.yaml`;
exports.CFN_STACKS_PATH = CFN_STACKS_PATH;
exports.CFN_TEMPLATE_STACK_PATH = `${CFN_STACKS_PATH}/serverless-cfn.yml`;
exports.CFN_PACKAGE_STACK_PATH = `${SAM_FOLDER_PATH}/serverless-xfm.cfn.yml`;
