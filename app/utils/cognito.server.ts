import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { createCookieSessionStorage, redirect } from 'remix';

import { promisify } from 'util';
import awsmobile from './awsExports';

const storage = createCookieSessionStorage({
  cookie: {
    name: 'OF_session',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  const cookie = storage.getSession(request.headers.get('Cookie')) || undefined;
  return cookie;
}

export async function getUser() {
  const poolData = {
    UserPoolId: awsmobile.aws_user_pools_id,
    ClientId: awsmobile.aws_user_pools_web_client_id,
  };
  const userPool = new CognitoUserPool(poolData);
  const user = userPool.getCurrentUser();
  return user;
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

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
      Name: 'email',
      Value: email,
    });

    let attributes = [emailAttribute];
    const promisifiedRegister = promisify(userPool.signUp).bind(userPool);
    return promisifiedRegister(email, password, attributes, attributes);
  };

  try {
    const res = await register({ email, password });
    return res;
  } catch (error) {
    console.error(`Error signing user up`);
  }
}

type ConfirmationCredentials = {
  code: string;
  email: string;
};

export async function confirmSignUp({ code, email }: ConfirmationCredentials) {
  return new Promise<CognitoUserSession>((resolve, reject) => {
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
        console.log(`Error confirming user: ${error}`);
        reject(error);
      }
      resolve(result);
    });
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
      onSuccess: result => {
        resolve(result);
      },
      onFailure: error => {
        reject(error);
      },
    });
  });
}

export async function logout(request: Request) {
  const currentUser = await getUser();
  if (currentUser) {
    const session = await storage.getSession(request.headers.get('Cookie'));
    await storage.destroySession(session);
    await currentUser.signOut();
    return redirect(`/login`, {
      headers: {
        'Set-Cookie': '',
      },
    });
  }
  throw new Error(`Couldn't log out`);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const user = await getUser();
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
  const user = await getUser();
  if (!user) {
    throw new Error(
      `Your session has expired. Please login again to initiate a forgot password request`
    );
  }
  user.forgotPassword({
    onSuccess: data => {
      user.confirmPassword(code, newPassword, {
        onSuccess: data => {
          console.log(`Successfully reset your password!`);
        },
        onFailure: error => {
          throw new Error(`There was an error confirming the code: ${error}`);
        },
      });
    },
    onFailure: error => {
      throw new Error(
        `Could not complete the forgot password request: ${error}`
      );
    },
  });
}
