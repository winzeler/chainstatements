import * as dotenv from 'dotenv';
dotenv.config();

import * as CovalentHQ from '../src/';
import { WalletBalanceItem } from '../src/lib/interfaces';
import BigNumber from 'bignumber.js';

import {
    HybiscusClient,
    Report,
    Components
} from "@hybiscus/web-api";
import { IReportDefinition } from '@hybiscus/web-api/lib/cjs/types/Report';
const { Core } = Components;
const { Section, Table, Row } = Core;

const reportSchema : IReportDefinition = {
    "type": "Report",
    "options": {
        "report_title": "0xplaceholder",
        "report_byline": "Monthly Wallet Statement",
        "version_number": "v0.1 ChainStatements.com"
    },
    "config": {
        "colour_theme": "summer",
        "typography_theme": "jost"
    },
    "components": [
        {
            "type": "Section",
            "options": {
                "section_title": "ENS:  placeholder.eth",
                "highlighted": true,
                "columns": 3
            },
            "components": [
                {
                    "type": "Card",
                    "options": {
                        "title": "Chain",
                        "value": "Ethereum"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Total Balance",
                        "value": "11,983",
                        "units": "$"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Last Month",
                        "value": "10,420",
                        "units": "$"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Fiat Currency",
                        "value": "USD",
                        "icon": "coin"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Number of Tokens",
                        "value": "116",
                        "icon": "comet"
                    }
                },
                {
                    "type": "Card",
                    "options": {
                        "title": "Percent Change",
                        "value": "0.15",
                        "units": "%",
                        "icon": "chart-area-line"
                    }
                }
            ]
        },
        {
            "type": "Section",
            "options": {
                "section_title": "Top Tokens"
            },
            "components": [ 
                {
                    "type": "Row",
                    "options": {
                        "columns": 2
                    },
                    "components": [
                    {
                        "type": "DoughnutRing",
                        "options": {
                            "width": "1/2",
                            "data": [{"end": 55}, {"end": 78}],
                            "chart_title": "By Price",
                            "inside_title": "Usage",
                            "inside_subtitle": "(hours)"
                        }
                    },
                    {
                        "type": "DoughnutRing",
                        "options": {
                            "width": "1/2",
                            "data": [{"end": 55}, {"end": 78}],
                            "chart_title": "By Quantity",
                            "inside_title": "Usage",
                            "inside_subtitle": "(hours)"
                        }
                    }
    
                    ]
                }
            ]
        },
        {
            "type": "Section",
            "options": {
                "section_title": "Best Performing Tokens"
            },
            "components": [
                {
                    "type": "Table",
                    "options": {
                        "title": "",
                        "headings": [
                            "Name",
                            "Symbol",
                            "Price",
                            "Quantity",
                            "Balance"
    
                        ],
                        "striped": true,
                        "rows": [
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "type": "Section",
            "options": {
                "section_title": "Worst Performing Tokens",
                "highlighted": true
            },
            "components": [
                {
                    "type": "Table",
                    "options": {
                        "title": "",
                        "headings": [
                            "Name",
                            "Symbol",
                            "Price",
                            "Quantity",
                            "Balance"
                        ],
                        "striped": true,
                        "rows": [
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ],
                            [
                                "Ethereum",
                                "ETH",
                                "$1,550.00",
                                "0.580",
                                "$940.00"
                            ]                        ]
                    }
                }
            ]
        }
    ]
    };
    

(async () => {
  const address = "0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de";   //demo.eth
  try {
    const covalentHQ = CovalentHQ.createAPI(process.env.COVALENT_API_KEY ? process.env.COVALENT_API_KEY : "");

    // Get token balances for address
    const balances = await covalentHQ.getTokenBalancesForAddress(address, 1);
  
    const client = new HybiscusClient(process.env.PDF_KEY ? process.env.PDF_KEY : "");
    try {
        const response = await client.buildReport({ report: null, reportSchema });
        console.log(response);
    } catch (error) {
        console.error(error);   
    }

    reportSchema.options.report_title = balances['address'];
    reportSchema.components[0].options.section_title = "ENS:  demo.eth"
    //reportSchema.components[0].components[3].options.value = balances['data']?.quote_currency;

    console.log(balances['address']);
    console.log(balances['chain_id']);
    console.log(balances['updated_at']);
    console.log(balances['next_updated_at']);
    console.log(balances['quote_currency']);

    
    const itemArr  = balances['items'] as WalletBalanceItem[];

    for (var i=0; i< itemArr.length; i++) {

      itemArr[i].balance_dec =  new BigNumber(itemArr[i].balance).shiftedBy(-itemArr[i].contract_decimals).toString()
      itemArr[i].balance_24h_dec =  new BigNumber(itemArr[i].balance_24h).shiftedBy(-itemArr[i].contract_decimals).toString()

      const itm = itemArr[i];
      console.log(itm);
    }
    
  
} catch (err) {
    console.error(err);

}
})();