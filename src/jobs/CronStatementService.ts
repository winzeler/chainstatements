// import * as Sentry from "@sentry/serverless";
import config from "../config";
import {
    apiGatewayResponse,
    invokeSqsFunction,
  } from "../helpers/aws.helper";
import Address from "../models/address.model";
import connectDB from "../database";
import { sleep } from "../helpers/sleep";
import { 
    AddressStatus,
} from "../config/constants";
  
/*
Sentry.AWSLambda.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.env,
});
*/

  

export const CronMonthlyStatementService =  // Sentry.AWSLambda.wrapHandler( )
async (event: any) => {
    await connectDB();

    console.log("CronMonthlyStatementService ", event);

    // TODO: move interval logic to SQS handler
    // find current month
    // find last calendar month

    // find all addresses not disabled and matching eth

    const nCount = await Address.count({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.success,
        disabled: false,
      });
    if (nCount <= 0) {
        console.log("CronMonthlyStatementService no addresses found");
        return apiGatewayResponse(200, "CronMonthlyStatementService no addresses found");
    }
     // TODO: watch for race condition with concurrent monthly and daily statement sends
     const nPending = await Address.count({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.pending,
        disabled: false,
      });

    if (nPending > 0) {
        console.log("WARNING, CronMonthlyStatementService addresses found in pending ", nPending);
    }


    await Address.updateMany(
    {
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.success,
        disabled: false,
    },
    { status: AddressStatus.pending }
    );

    const currentAddresses = await Address.find({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.pending,
        disabled: false,
        });
    

    for (let i = 0; i < currentAddresses.length; i++) {
        const address = currentAddresses[i].address;
        const chain_id = currentAddresses[i].chain_id;

        console.log(address);                   // toLowerCase() ??
        // send to sqs to process address

        await invokeSqsFunction({
            MessageBody: "ChainStatements Monthly Statement",
            QueueUrl: config.sqs.queueUrl ? config.sqs.queueUrl : "",
            MessageAttributes: {
              addressId: {
                DataType: "String",
                StringValue: String(address),
              },
              chainId: {
                  DataType: "Number",
                  StringValue: String(chain_id),
              },
              interval: {
                  DataType: "String",
                  StringValue: String("Monthly"),     // send last calendar month
              }
            },
          }
          );
          await sleep(50);
    }

    console.log("CronMonthlyStatementService queued statements = ", currentAddresses.length);

    return apiGatewayResponse(200, "CronMonthlyStatementService queued statements = " + currentAddresses.length);
}

export const CronDailyStatementService =  // Sentry.AWSLambda.wrapHandler( )
async (event: any) => {
    await connectDB();

    console.log("CronDailyStatementService ", event);

    // TODO: move logic to SQS handler
    // find current month
    // find last calendar month

    const nCount = await Address.count({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.success,
        disabled: false,
      });

    if (nCount <= 0) {
        console.log("CronDailyStatementService no addresses found");
        return apiGatewayResponse(200, "CronDailyStatementService no addresses found");
    }
     // TODO: watch for race condition with concurrent monthly and daily statement sends
    const nPending = await Address.count({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.pending,
        disabled: false,
      });

    if (nPending > 0) {
        console.log("WARNING, CronDailyStatementService addresses found in pending ", nPending);
    }


    await Address.updateMany(
    {
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.success,
        disabled: false,
    },
    { status: AddressStatus.pending }                  
    );

    const currentAddresses = await Address.find({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.pending,
        disabled: false,
        });


    for (let i = 0; i < currentAddresses.length; i++) {
        const address = currentAddresses[i].address;
        const chain_id = currentAddresses[i].chain_id;

        console.log(address);                   // toLowerCase() ??
        // send to sqs to process address

        await invokeSqsFunction({
            MessageBody: "ChainStatements Monthly Statement",
            QueueUrl: config.sqs.queueUrl ? config.sqs.queueUrl : "",
            MessageAttributes: {
              addressId: {
                DataType: "String",
                StringValue: String(address),
              },
              chainId: {
                  DataType: "Number",
                  StringValue: String(chain_id),
              },
              interval: {
                  DataType: "String",
                  StringValue: String("Daily"),     // send last calendar month
              }
            },
          }
          );
          await sleep(50);
    }

    console.log("CronDailyStatementService queued statements = ", currentAddresses.length);


    return apiGatewayResponse(200, "CronDailyStatementService queued statements = " + currentAddresses.length);
}

export const CronAnnualStatementService =  // Sentry.AWSLambda.wrapHandler( )
async (event: any) => {
    await connectDB();

    console.log("CronAnnualStatementService ", event);

    // TODO: move logic to SQS handler
    // find current month
    // find last calendar month

    // find all addresses not disabled and matching eth
    const nCount = await Address.count({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.success,
        disabled: false,
      });

    if (nCount <= 0) {
        console.log("CronAnnualStatementService no addresses found");
        return apiGatewayResponse(200, "CronAnnualStatementService no addresses found");
    }
     // TODO: watch for race condition with concurrent monthly and daily statement sends
     const nPending = await Address.count({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.pending,
        disabled: false,
      });

    if (nPending > 0) {
        console.log("WARNING, CronAnnualStatementService addresses found in pending ", nPending);
    }


    await Address.updateMany(
    {
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.success,
        disabled: false,
    },
    { status: AddressStatus.pending }
    );

    const currentAddresses = await Address.find({
        chain : "ethereum",
        chain_id : 1,    
        status: AddressStatus.pending,
        disabled: false,
        });


    for (let i = 0; i < currentAddresses.length; i++) {
        const address = currentAddresses[i].address;
        const chain_id = currentAddresses[i].chain_id;

        console.log(address);                   // toLowerCase() ??
        // send to sqs to process address

        await invokeSqsFunction({
            MessageBody: "ChainStatements Annual Statement",
            QueueUrl: config.sqs.queueUrl ? config.sqs.queueUrl : "",
            MessageAttributes: {
              addressId: {
                DataType: "String",
                StringValue: String(address),
              },
              chainId: {
                  DataType: "Number",
                  StringValue: String(chain_id),
              },
              interval: {
                  DataType: "String",
                  StringValue: String("Annual"),     // send last calendar month
              }
            },
          }
          );
          await sleep(50);
    }

    console.log("CronAnnualStatementService queued statements = ", currentAddresses.length);

    return apiGatewayResponse(200, "CronAnnualStatementService queued statements = " + currentAddresses.length);
}

  