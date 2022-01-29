import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";

import { promisify } from "util";
import awsmobile from "./awsExports";

type AccessCredentials = {
  email: string;
  password: string;
  code?: string;
};

export async function signUp({ email, password }: AccessCredentials) {
  const userPool = new CognitoUserPool({
    UserPoolId: awsmobile.aws_user_pools_id,
    ClientId: awsmobile.aws_user_pools_web_client_id,
  });
  const register = ({ email, password }: AccessCredentials) => {
    const emailAttribute = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    let attributes = [emailAttribute];
    const promisifiedRegister = promisify(userPool.signUp).bind(userPool);
    return promisifiedRegister(email, password, attributes, attributes);
  };

  try {
    const res = await register({ email, password });
    console.log(`Signup Success -- Result: ${JSON.stringify(res, null, 2)}`);
    return res;
  } catch (error) {
    console.error(`Error signing user up`);
  }
}

export async function confirmSignUp({
  email,
  password,
  code,
}: AccessCredentials) {
  if (!code) return new Error(`Must provide code`);
  const poolData = {
    UserPoolId: awsmobile.aws_user_pools_id,
    ClientId: awsmobile.aws_user_pools_web_client_id,
  };
  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, (error, result) => {
    if (error) {
      JSON.stringify(error);
      return error;
    }
    console.log(`Confirmation Result: ${JSON.stringify(result)}`);
    return result;
  });
}

export async function login({ email, password }: AccessCredentials) {
  return new Promise<CognitoUserSession>((resolve, reject) => {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: awsmobile.aws_user_pools_id,
      ClientId: awsmobile.aws_user_pools_web_client_id,
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });
}

export async function logout() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return await currentUser.signOut();
  }
  return null;
}

export async function getCurrentUser() {
  const poolData = {
    UserPoolId: awsmobile.aws_user_pools_id,
    ClientId: awsmobile.aws_user_pools_web_client_id,
  };
  const userPool = new CognitoUserPool(poolData);
  const user = userPool.getCurrentUser();
  return user;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error(`Could not verify your credentials. Please log back in`);
  }
  user.changePassword(currentPassword, newPassword, (result, error) => {
    if (error) {
      throw new Error(`Could not change your password. Please try again`);
    }
    return result;
  });
}

export async function forgotPassword(code: string, newPassword: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error(
      `Your session has expired. Please login again to initiate a forgot password request`
    );
  }
  user.forgotPassword({
    onSuccess: (data) => {
      user.confirmPassword(code, newPassword, {
        onSuccess: (data) => {
          console.log(`Successfully reset your password!`);
        },
        onFailure: (error) => {
          throw new Error(`There was an error confirming the code: ${error}`);
        },
      });
    },
    onFailure: (error) => {
      throw new Error(
        `Could not complete the forgot password request: ${error}`
      );
    },
  });
}
