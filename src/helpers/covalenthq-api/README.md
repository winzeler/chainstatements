# CovalentHQ API

Created as part of a SF ETHGlobal hackathon project.

## Introduction

The Covalent Unified API can be used to pull balances, positions and historical granular transaction data from dozens of blockchain networks. This data enables hundreds of end-user use-cases like wallets, investor dashboards, taxation tools and as-of-yet unknown use-cases.

One Unified API. One Billion Possibilities.

Read more about this API on [covalenthq.com](https://covalenthq.com/).

Developer Resources

[API Docs](https://www.covalenthq.com/docs/api) - Use the Covalent API directly from the browser with our API docs
[Knowledge Base](http://covalenthq.com/docs) - check out our developer support resources and details on every supported blockchain network.


## Installation

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
  //const balances = await covalentHQ.getWalletBalance(1, 'demo.eth', 'USD');

  console.log(balances);
})();

```

## TODO

* Add full suite of APIs, Class B
* Add more examples
* Add tests, test other chains
* More documentation

&copy; 2022, [@winzeler](https://github.com/winzeler)