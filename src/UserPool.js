// Do this command, npm i amazon-cognito-identity-js, to import below
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_tebu8PQ0Q", // Found in General Settings on AWS
  ClientId: "7bjg3585s78j42e9nbleikqs45", // Found in App Clients on AWS
};

export default new CognitoUserPool(poolData);
