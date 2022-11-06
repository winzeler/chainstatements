import * as AWS from "aws-sdk";
import { _Blob } from "aws-sdk/clients/lambda";
import { SQS } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

import config from "../config";
//import * as Sentry from "@sentry/serverless";

/*
  Sentry.AWSLambda.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.env,
  });
*/

// Invoke other lambda function for background process
export const invokeLamdaFunction = async (
  FunctionName: string,
  Payload: _Blob
) => {
  return new Promise((resolve, reject) => {
    const Lambda = new AWS.Lambda({ region: "us-east-1" });
  
    console.log(`Function invocation: ${FunctionName} (${JSON.stringify(Payload)})`);
    Lambda.invoke(
      { FunctionName, Payload, InvocationType: "Event" },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

// Invoke SQS Function
export const invokeSqsFunction = async (
  Body: Omit<
    SQS.Types.SendMessageRequest,
    "MessageGroupId" | "MessageDeduplicationId" | "DelaySeconds"
  >
) => {
  try {
    const id = uuidv4();
    const sqs = new SQS({});
    const response = await sqs
      .sendMessage({
        ...Body,
        MessageGroupId: id,
        MessageDeduplicationId: id,
        DelaySeconds: 0,
      })
      .promise();
    console.log(`Statement added to Queue`, response);
  } catch (error) {
    console.log("ERROR on SQS invoke function", error);
    //Sentry.captureException(error);
  }
};


export const apiGatewayResponse = (
  statusCode: number,
  message: string,
  data?: unknown
) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(
      {
        message,
        ...(data ? { data } : {}),
      },
      null,
      2
    ),
  };
};
