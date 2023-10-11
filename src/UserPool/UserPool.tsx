import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_589ErBjh6",
    ClientId : "7sf07ttfecsnilf5mbv2c0gos3" 
}

export default new CognitoUserPool(poolData);