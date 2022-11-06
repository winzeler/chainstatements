// import * as Sentry from "@sentry/serverless";
import config from "../config";
import Address from "../models/address.model";
import connectDB from "../database";
import { apiGatewayResponse } from "../helpers/aws.helper";
import { 
    AddressStatus,
    AddressStatusValues,
} from "../config/constants";
import { IAddress } from "../interfaces/address.interface";

import * as CovalentHQ from '../helpers/covalenthq-api/src/index';
import { addSeconds } from "date-fns";

// import {
//  ,
// } from "../enums";
  
/*
Sentry.AWSLambda.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.env,
});
*/


/**
 * SQS Handler for subscription events
 */
 export const ChainStatementsSqsHandler =  // Sentry.AWSLambda.wrapHandler( 
    async (event: any) => {
      await connectDB();
      console.log("ChainStatementsSqsHandler ", JSON.stringify(event));
  
      console.log("ChainStatementsSqsHandler Record count = ", event.Records.length);

      for (const record of event.Records) {
        const address = await Address.findOne({ 
          address: record.messageAttributes.addressId.stringValue, 
          chain_id: Number(record.messageAttributes.chainId.stringValue),
        });
        const currentInterval = record.messageAttributes.interval.stringValue;

        if (address && currentInterval) {
            await processChainStatement(address, currentInterval);

        } else {
            console.log("ChainStatementsSqsHandler address or interval not found");
        }
      }
  
      return apiGatewayResponse(200, "ChainStatements SQS job ended.");
    }
    /*
    , {
      // Ignore any errors raised by the Sentry SDK on attempts to send events to Sentry
      ignoreSentryErrors: true,
    });
    */



const processChainStatement = async (address: IAddress, currentInterval: string) => {

    const chain = address.chain;
    const chain_id = Number(address.chain_id);
    const email = address.email;
    const addr = address.address;
    const name = address?.name;

    const push = address?.push;
    const xmtp = address?.xmtp;
    

    try {
        const covalentHQ = CovalentHQ.createAPI(config.covalent.apiKey ? config.covalent.apiKey : "");

        // Get token balances for address
        const balances = await covalentHQ.getTokenBalancesForAddress(addr, 1);
      
        console.log(balances);
      
    } catch (err) {
        console.error(err);

    }
}
