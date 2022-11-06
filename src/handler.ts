import { ApolloServer } from "apollo-server-lambda";
//import * as Sentry from "@sentry/serverless";

import config from "./config";

//import typeDefs from "./graphql/schema/typeDefs";
//import resolvers from "./graphql/resolvers";

import connectDB from "./database";


connectDB();

// main sqs
import { ChainStatementsSqsHandler } from "./sqs/ChainStatementsSqsHandler";

// async handler for right now
//import ChainStatementsHandler from "./controllers/ChainStatementsHandler";

// rest handlers
import { 
    addAddress,
    removeAddress,
    checkAddress,
    // checkStatus,
 } from "./controllers/StatementService";

// cron jobs
import {
    CronMonthlyStatementService,
    CronDailyStatementService,
    CronAnnualStatementService,
  } from "./jobs/CronStatementService";
  
/*
Sentry.init({
    environment: config.sentry.env,
    dsn: config.sentry.dsn,
  });
*/


/*
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.log("error", error);
      return error;
    },
    formatResponse: (response) => {
      console.log("response", response);
      return response;
    },
    context: async ({ event, context }) => {
      await connectDB();

      return {
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
      };
    },
  });

// graphql endpoint
exports.graphqlHandler = server.createHandler();
*/
 
// main sqs
exports.ChainStatementsSqsHandler = ChainStatementsSqsHandler;

// rest handlers
exports.addAddress = addAddress;
exports.removeAddress = removeAddress;
exports.checkAddress = checkAddress;
//export.checkStatus = checkStatus;

// cron jobs
exports.CronMonthlyStatementService = CronMonthlyStatementService;
exports.CronDailyStatementService = CronDailyStatementService;
exports.CronAnnualStatementService = CronAnnualStatementService;