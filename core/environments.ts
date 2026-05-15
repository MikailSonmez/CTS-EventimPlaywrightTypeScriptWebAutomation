export const Environments = {
  DEV: {
    url: 'https://dev.example-eventim.com',
    apiURL: 'https://api-dev.example-eventim.com/v1',
    dbConnection: 'mongodb://localhost:27017/eventim_dev'
  },
  STG: {
    url: 'https://stg.example-eventim.com',
    apiURL: 'https://api-stg.example-eventim.com/v1',
    dbConnection: 'mongodb://localhost:27017/eventim_stg'
  },
  PROD: {
    url: 'https://www.example-eventim.com',
    apiURL: 'https://api.example-eventim.com/v1',
    dbConnection: 'mongodb://localhost:27017/eventim_prod'
  }
};

export function getEnvironmentConfig() {
  const env = process.env.TEST_ENV || 'STG';
  switch (env.toUpperCase()) {
    case 'DEV':
      return Environments.DEV;
    case 'PROD':
      return Environments.PROD;
    case 'STG':
    default:
      return Environments.STG;
  }
}
