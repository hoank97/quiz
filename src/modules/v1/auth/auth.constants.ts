export const URL =
  'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=';

export const authConstants = {
  jwt: {
    secret: 'quiz',
    expirationTime: {
      accessToken: '30d',
      refreshToken: '365d',
    },
    secrets: {
      accessToken:
        '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
      refreshToken:
        'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
    },
  },
  redis: {
    expirationTime: {
      jwt: {
        accessToken: 86400, // 1d
        refreshToken: 604800, // 7d
      },
    },
  },
};
