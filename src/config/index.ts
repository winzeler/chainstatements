export interface IConfig {

  /**
   * mongo connection uri
   */
  databaseURL: string | undefined;
  /**
   * main SQS queue url, aws ARN
   */
   sqs: {
    queueUrl: string | undefined;
    queueArn: string | undefined;
  },

  /**
   * covalent price url
   */
  covalent: {
    baseURL: string | undefined;
    apiKey: string | undefined;
  },
  /**
   * sentry config
   */
  sentry: {
    dsn: string | undefined;
    env: string | undefined;
  },
}

const config: IConfig = {
  /**
   * database connection uri
   */
  databaseURL: process.env.MONGODB_URI,
  /**
   * main SQS queue url, aws ARN
   */
  sqs: {
    queueUrl: process.env.CHAINSTATEMENTS_SQS_URL,
    queueArn: process.env.CHAINSTATEMENTS_SQS_ARN,
  },
  /**
   * coin price service
   */
  covalent: {
    baseURL: process.env.COVALENT_BASE_URL,
    apiKey: process.env.COVALENT_API_KEY,
  },
  /**
   * sentry config
   */
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.SENTRY_ENVIRONMENT,
  },
};


export default config;