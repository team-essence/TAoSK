export default class DotEnv {
  /**
   * firebase config
   */
  public getFirebaseConfig = () => {
    return {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
      appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
    };
  };

  /**
   * API endpoint
   */
  public getApiEndpoint = () => {
    return process.env.REACT_APP_API_URL;
  };
}

export const env = new DotEnv();
