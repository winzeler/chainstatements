

// import * as Sentry from "@sentry/serverless";
import config from "../config";

import { IAddress } from "../interfaces/address.interface";
import {
  apiGatewayResponse,
  invokeSqsFunction,
} from "../helpers/aws.helper";
import Address from "../models/address.model";

// import {
//  ,
// } from "../enums";

import connectDB from "../database";
// import { invokeSqsFunction } from "../helpers/aws.helper";
import { sleep } from "../helpers/sleep";
import { 
    AddressStatus,
    AddressStatusValues,
 } from "../config/constants";


 /*
Sentry.AWSLambda.init({
  dsn: config.sentry.dsn,
  environment: config.sentry.env,
});
*/

/**
 * Function to remove address
 *
 * @param event API Gateway event
 * @returns
 */
 export const removeAddress = async (event: any) => {
    try {
      await connectDB();
      const body = JSON.parse(event.body);
  
      if (!body) return apiGatewayResponse(400, "required parameter: [body]");
      console.log("body", body);

      const { address, chain, chain_id } = JSON.parse(event.body);
      //let { email, name, push, xmtp, disabled } = JSON.parse(event.body);
        
      if (!address) {
        return apiGatewayResponse(400, "required parameter: [address]");
      }

      if (address) {
        // validate address is valid  // TODO: 0x only here
        const re = /^0x[a-fA-F0-9]{40}$/;
        if (!re.test(address)) {
            return apiGatewayResponse(400, "invalid blockchain address");
        }
      }
      if (!chain) {
        return apiGatewayResponse(400, "required parameter: [chain]");
      }

      if (!chain_id) {
        return apiGatewayResponse(400, "required parameter: [chain_id]");
      }

      const addrStatus = await Address.findOne({
        address,
        chain,
        chain_id,    
        // status: AddressStatus.success,
      });
  
      if (!addrStatus) {  
        return apiGatewayResponse(400, "Address could not be found.");
      } 
      // check is Queue is currently pending and fail if so
      if (addrStatus?.status == AddressStatus.pending) {         
        return apiGatewayResponse(400, "Address is pending a ChainStatement. Try again later.");
      }
      // check is Queue is currently sending and fail if so
      if (addrStatus?.status == AddressStatus.sending) {
        return apiGatewayResponse(400, "Address is sending a ChainStatement. Try again later.");
      }


      await addrStatus.delete();
      await addrStatus.save();
  
 
      //
      // do something interesting, like send a message or email to confirm
      //
  
      return apiGatewayResponse(200, "Address removed from ChainStatements.");
    } catch (err) {
      console.error(err);
      // Sentry.captureException(err);
  
      return apiGatewayResponse(500, "Internal Server Error");
    }
  };
  

  /**
 * Function to add address
 *
 * @param event API Gateway event
 * @returns
 */
 export const addAddress = async (event: any) => {
    try {
      await connectDB();
      const body = JSON.parse(event.body);
  
      if (!body) return apiGatewayResponse(400, "required parameter: [body]");
      console.log("body", body);

      const { address, chain, chain_id } = JSON.parse(event.body);
      let { email, name, push, xmtp, disabled } = JSON.parse(event.body);
        
      if (email) {
        // validate email is valid
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            return apiGatewayResponse(400, "invalid email");
        }
      }
      if (!address) {
        return apiGatewayResponse(400, "required parameter: [address]");
      }

      if (address) {
        // validate address is valid  // TODO: 0x only here
        const re = /^0x[a-fA-F0-9]{40}$/;
        if (!re.test(address)) {
            return apiGatewayResponse(400, "invalid address");
        }
      }
      if (!chain) {
        return apiGatewayResponse(400, "required parameter: [chain]");
      }

      if (!chain_id) {
        return apiGatewayResponse(400, "required parameter: [chain_id]");
      }

      const addr = await Address.findOneAndUpdate(
        {
          address,
          chain,
          chain_id,
        },
        {
          email,
          name,
          push, 
          xmtp,
          disabled,
          status: AddressStatus.success,
        },
        {
          upsert: true,
          new: true,
        }
      );
      
  
      const addrStatus = await Address.findOne({
        address,
        chain,
        chain_id,    
        // status: AddressStatus.success,
      });
  
      if (!addrStatus) {  
        return apiGatewayResponse(400, "Address could not be saved.");
      } 
      if (addrStatus?.status !== AddressStatus.success) {
        return apiGatewayResponse(400, "Address status was not success.");
      }

      //
      // do something interesting, like send a message to SQS to generate a statement
      //

      if ((!addrStatus?.disabled) && (config.sqs.queueUrl)) {
        await invokeSqsFunction({
          MessageBody: "ChainStatements Initial Statement",
          QueueUrl: config.sqs.queueUrl,
          MessageAttributes: {
            addressId: {
              DataType: "String",
              StringValue: String(addrStatus.address),
            },
            chainId: {
                DataType: "Number",
                StringValue: String(addrStatus.chain_id),
            },
            interval: {
                DataType: "String",
                StringValue: String("Monthly"),     // send last calendar month
            }
          },
        });
      }
  
  
      return apiGatewayResponse(200, "Address added successfully to ChainStatements.");
    } catch (err) {
      console.error(err);
      // Sentry.captureException(err);
  
      return apiGatewayResponse(500, "Internal Server Error");
    }
  };



  /**
 * Function to check address status
 *
 * @param event API Gateway event
 * @returns
 */
 export const checkAddress = async (event: any) => {
    try {
      await connectDB();
      const body = JSON.parse(event.body);
  
      if (!body) return apiGatewayResponse(400, "required parameter: [body]");
      console.log("body", body);

      const { address, chain, chain_id } = JSON.parse(event.body);
      //let { email, name, push, xmtp, disabled } = JSON.parse(event.body);
        
      if (!address) {
        return apiGatewayResponse(400, "required parameter: [address]");
      }

      if (address) {
        // validate address is valid  // TODO: 0x only here
        const re = /^0x[a-fA-F0-9]{40}$/;
        if (!re.test(address)) {
            return apiGatewayResponse(400, "invalid blockchain address");
        }
      }
      if (!chain) {
        return apiGatewayResponse(400, "required parameter: [chain]");
      }

      if (!chain_id) {
        return apiGatewayResponse(400, "required parameter: [chain_id]");
      }

      const addrStatus = await Address.findOne({
        address,
        chain,
        chain_id,    
        // status: AddressStatus.success,
      });
  
      if (!addrStatus) {  
        return apiGatewayResponse(400, "Address could not be found.");
      } 
      // check is Queue is currently pending and fail if so
      if (addrStatus?.status == AddressStatus.pending) {         
        return apiGatewayResponse(400, "Address is pending a ChainStatement. Try again later.");
      }
      // check is Queue is currently sending and fail if so
      if (addrStatus?.status == AddressStatus.sending) {
        return apiGatewayResponse(400, "Address is sending a ChainStatement. Try again later.");
      }


      await addrStatus.delete();
      await addrStatus.save();
  
 
      //
      // do something interesting, like send a message or email to confirm
      //
  
      return apiGatewayResponse(200, "Address removed from ChainStatements.");
    } catch (err) {
      console.error(err);
      // Sentry.captureException(err);
  
      return apiGatewayResponse(500, "Internal Server Error");
    }
  };
  