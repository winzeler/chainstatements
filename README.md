# ChainStatements.com - Beautiful Account Statements Automated

[ChainStatements.com API Platform at SF ETHGlobal](https://ethglobal.com/showcase/chainstatements-com-xefb9)

![Sample Statement Header
](https://storage.googleapis.com/ethglobal-api-production/projects%2Fxefb9%2Fimages%2FCleanShot%202022-11-06%20at%2008.18.08%402x.png)

ChainStatements is an API platform to automate, generate, schedule and delivery account statements, reports, and other records and receipts of on chain activity for specific user wallets. This is a solo hack!

Although I plan to add a dashboard and user interface in the future, for the SF ETHGlobal hackathon, I decided to focus on a solid off-chain backend and scalable design.  In the interest of time, I only did a proof of concept of the JSON template, JS filled, PDF report designs during the hackathon. 

My primarily focus was building out support for querying Covalent's REST API and generally show a proof of concept for the PDF generation. PDF generation was debugged with Hybiscus JSON and Typescript API.

![JSON for ChainStatements reports looks a bit like...
](https://storage.googleapis.com/ethglobal-api-production/projects%2Fxefb9%2Fimages%2FCleanShot%202022-11-06%20at%2008.20.23.gif)
The initial API is a REST API but the scaffolding is already in place for a GraphQL endpoint.

API users can make requests to:

```javascript
addAddress( )
removeAddress( )
checkAddress( )
```


It currently support Daily, Monthly and Annual statements. Socketlabs is integrated for email sending.  

All requests to send a report or generate a PDF are queued to a SQS queue in the AWS environment. The architecture was designed with a nod to microservices.  We are using Queues and the AWS Lambda serverless platform for all computing.

The SQS Queue is service by a Lambda called ChainStatementsSqsHandler which is called whenever a message hits the queue.

Cron scheduling handles the timers with AWS Eventbridge. This framework give us a simple way to add automaton in the future.  The serverless approach allows ChainStatements to scale up to meet demand and we don't keep servers idling when they are not processing timers or other scheduled event.  **CronMonthlyStatementService**, **CronDailyStatementService** and **CronAnnualStatementService** are functions that are triggerd by Eventbridge.

The entire platform, with the exception of the creation the SQS queues, was setup and deployed with the Serverless Framework, which handles generating the Cloudformation YAML.

Future integrations would be permissionless, no-email, using XMTP or Push Protocol.


## npm module for covalent


The Typescript covalenthq-api module will be in npm in a 0.0.1 release in the next day or so.

## CovalentHQ-API module

Also, created as part of this SF ETHGlobal hackathon project.  Solo hack.

## Introduction

The Covalent Unified API can be used to pull balances, positions and historical granular transaction data from dozens of blockchain networks. This data enables hundreds of end-user use-cases like wallets, investor dashboards, taxation tools and as-of-yet unknown use-cases.

One Unified API. One Billion Possibilities.

Read more about this API on [covalenthq.com](https://covalenthq.com/).

Developer Resources

[API Docs](https://www.covalenthq.com/docs/api) - Use the Covalent API directly from the browser with our API docs
[Knowledge Base](http://covalenthq.com/docs) - check out our developer support resources and details on every supported blockchain network.



## COMING SOON:


## Inspiration

## What it does

## How we built it

## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for ChainStatements.com
    



### Installation of the covalenthq-api sdk, typescript interfaces

```bash
npm i covalenthq-api
```

## Example usage


https://api.covalenthq.com/v1/1/address/demo.eth/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_a1857bea207c449a95f55fcd188


```node
import * as CovalentHQ from 'covalenthq-api';

(async () => {
  const covalentHQ = CovalentHQ.createAPI(API_KEY);

  // Get token balances for address
  const balances = await covalentHQ.getTokenBalancesForAddress(address, 1);


  console.log(balances);
})();

```

## TODO

* Add full suite of APIs, Class B
* Add more examples
* Add tests, test other chains
* More documentation

&copy; 2022, [@winzeler](https://github.com/winzeler)