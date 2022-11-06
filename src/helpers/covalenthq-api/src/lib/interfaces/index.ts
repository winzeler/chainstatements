// import { ChainId } from '../types';


export interface WalletBalance {
    address: string;
    chain_id: number;
    updated_at: string;                 // The updated time in UTC.         // date-time
    next_updated_at: string;            // The next updated time in UTC.    // date-time
    quote_currency: string;             // The requested fiat currency.     // 'USD'
    items: WalletBalanceItem[];
  }

export interface WalletBalanceItem {
    contract_decimals: number;          // The number of decimals the token uses.  // integer | int32
    contract_name: string;              // Smart contract name.
    contract_ticker_symbol: string;     // Smart contract ticker symbol.
    contract_address: string;           // Smart contract address.
    supports_erc: string[];             // The standard interface(s) supported for this token, eg: ERC-20.
    logo_url: string;                   // The URL of the token logo.
    last_transferred_at: string;        // The last time the token was transferred.  // date-time
    native_token: boolean;              // Indicates if a token is the chain's native gas token, eg: ETH on Ethereum.
    type: string;                       // The type of token.   // One of cryptocurrency, stablecoin, nft or dust.
    balance: string;                    // The balance of the token. // The asset balance. Use contract_decimals to scale this balance for display purposes.
    balance_24h: string;                // The asset balance 24 hours ago.
    balance_dec?: string;                //  Using contract_decimals to scale this balance for display purposes
    balance_24h_dec?: string;            // The asset value 24 hours ago using contract_decimals to scale this balance for display purposes.
    quote_rate: number;                 // The current spot exchange rate in quote-currency.  //    float
    quote_rate_24h: number;             // float // The spot exchange rate in quote-currency as of 24 hours ago.
    quote: number;                      // float  // The current balance converted to fiat in quote-currency.
    quote_24h: number;                  // float // The current balance converted to fiat in quote-currency as of 24 hours ago.
    nft_data?: string[]                 // Array of NFTs that are held under this contract.
    INFTMetadata?: any;                 // {Object} // Array of NFTs that are held under this contract.     // TODO: add type
}

export interface HistoricalPortfolioValue {
    address: string;                  // The wallet address.
    updated_at: string;               // The updated time in UTC.         // date-time
    next_updated_at: string;          // The next updated time in UTC.    // date-time
    quote_currency: string;           // The requested fiat currency.     // 'USD'
    chain_id: number;                // The chain ID.                    // integer | int64
    items: HistoricalPortfolioValueItem[];
    pagination: Pagination;
}

export interface Pagination {
    has_more: boolean;                // Indicates if there are more pages of data available.
    page_number: number;              // The current page number.
    page_size: number;                // The number of items per page.
    total_count: number;              // The total number of items.
}


export interface HistoricalPortfolioValueItem {
    contract_decimals: number;        // The number of decimals the token uses.  // integer | int32
    contract_name: string;            // Smart contract name.
    contract_ticker_symbol: string;   // Smart contract ticker symbol.
    contract_address: string;         // Smart contract address.
    supports_erc: string[];           // The standard interface(s) supported for this token, eg: ERC-20.          
    logo_url: string;                 // The URL of the token logo.
    holdings: DailyQuote[];           // The daily quotes for the token.
}

export interface DailyQuote {
    timestamp: string;                // The timestamp of the quote in UTC.  // date-time
    open: Quote;                      // The open quote.
    high: Quote;                      // The high quote.
    low: Quote;                       // The low quote.
    close: Quote;                     // The close quote.
}

export interface Quote {
    balance: number;                  // The balance of the token. // The asset balance. Use contract_decimals to scale this balance for display purposes.
    quote: number;                    // float  // The current balance converted to fiat in quote-currency.
} 


export interface TokenResponse {
    address: string;                  // The wallet address.
    updated_at: string;               // The updated time in UTC.         // date-time
    next_updated_at: string;          // The next updated time in UTC.    // date-time
    quote_currency: string;           // The requested fiat currency.     // 'USD'
    chain_id: number;                // The chain ID.                    // integer | int64
    items: BlockTransactionWithContractTransfers[]; // The transactions.
    pagination: Pagination;
} 

export interface BlockTransactionWithContractTransfers {
    block_signed_at: string;          // The block signed time in UTC.    // date-time
    block_height: number;             // The block height.                // integer | int64
    tx_hash: string;                  // The transaction hash.
    tx_offset: number;                // The transaction offset.          // integer | int32
    successful: boolean;                 // Indicates if the transaction was successful.
    from_address: string;             // The sender address.
    from_address_label: string;       // The sender address label.
    to_address: string;               // The recipient address.
    to_address_label: string;         // The recipient address label.
    value: number;                    // The transaction value.           // integer | int64
    value_quote: number;              // The transaction value in quote-currency.  // float
    gas_offered: number;              // The gas offered.                 // integer | int64
    gas_spent: number;                // The gas spent.                   // integer | int64
    gas_price: number;                // The gas price.                   // integer | int64
    fees_paid: number;                // The fees paid.                   // integer | int64
    gas_quote: number;                // The gas quote.                   // double
    gas_quote_rate: number;           // The gas quote rate.              // double
    transfers: TokenTransferItem[];   // The token transfers.

}

export interface TokenTransferItem {
    block_signed_at: string;          // The block signed time in UTC.    // date-time
    tx_hash: string;                  // The transaction hash.
    from_address: string;             // The sender address.
    from_address_label: string;       // The sender address label.
    to_address: string;               // The recipient address.
    to_address_label: string;         // The recipient address label.
    contract_decimals: number;        // The number of decimals the token uses.  // integer | int32
    contract_name: string;            // Smart contract name.
    contract_ticker_symbol: string;   // Smart contract ticker symbol.
    contract_address: string;         // Smart contract address.
    logo_url: string;                 // The URL of the token logo.
    transfer_type: string;            // IN/OUT
    delta: number;                    // The token delta.                 // integer | int64
    balance: number;                  // The transfer balance. Use contract_decimals to scale this balance for display purposes.
    quote_rate: number;               // The current spot exchange rate in quote-currency.  //    float
    delta_quote: number;              // The transfer balance converted to fiat in quote-currency.
    balance_quote: number;            // The transfer balance converted to fiat in quote-currency.
    method_call?: MethodCallsForTransfers;         // The method call.


}

export interface MethodCallsForTransfers {
    sender_address: string;           // The sender address.
    method: string;                   // The name of the decoded item.

}


export interface TransactionResponse {
    address: string;                  // The wallet address.
    updated_at: string;               // The updated time in UTC.         // date-time
    next_updated_at: string;          // The next updated time in UTC.    // date-time
    quote_currency: string;           // The requested fiat currency.     // 'USD'
    chain_id: number;                 // The chain ID.                    // integer | int64
    items: BlockTransactionWithLogEvents[];     // The transactions.
    pagination: Pagination;
}

export interface SingleTransactionResponse {
    updated_at: string;                         // The updated time in UTC.         // date-time
    items: BlockTransactionWithLogEvents;       // The transaction.
}

export interface BlockTransactionWithLogEvents {
    block_signed_at: string;          // The block signed time in UTC.    // date-time
    block_height: number;             // The block height.                // integer | int64
    tx_hash: string;                  // The transaction hash.
    tx_offset: number;                // The transaction offset.          // integer | int32
    successful: boolean;                 // Indicates if the transaction was successful.
    from_address: string;             // The sender address.
    from_address_label: string;       // The sender address label.
    to_address: string;               // The recipient address.
    to_address_label: string;         // The recipient address label.    
    value: number;                    // The transaction value.           // integer | int64
    value_quote: number;              // The transaction value in quote-currency.  // float
    gas_offered: number;              // The gas offered.                 // integer | int64
    gas_spent: number;                // The gas spent.                   // integer | int64
    gas_price: number;                // The gas price.                   // integer | int64
    fees_paid: number;                // The fees paid.                   // integer | int64
    gas_quote: number;                // The gas quote.                   // double
    gas_quote_rate: number;           // The gas quote rate.              // double
    log_events: LogEventItem[];      // The log events.
}


export interface LogEventItem {
    block_signed_at: string;          // The block signed time in UTC.    // date-time
    block_height: number;             // The block height.                // integer | int64
    tx_offset: string;                // The transaction hash.
    log_offset: number;               // The log offset.                  // integer | int32
    tx_hash: string;                  // The transaction hash
    raw_log_topics?: string[];        // The raw log topics.
    sender_contract_decimals: number; // Smart contract decimals.
    sender_name: string;              // Smart contract name.
    sender_contract_ticker_symbol: string; // Smart contract ticker symbol.
    sender_address: string;           // Smart contract address.
    sender_address_label: string;       // Smart contract address label.
    sender_logo_url: string;          // The URL of the token logo.
    raw_log_data: string;             // The raw log data.
    decoded?: any;                     // The decoded log events.           // TODO: add type

}


/*
"decoded":
{
    "name":"ApprovalForAll",
    "signature":"ApprovalForAll(indexed address _owner, indexed address _operator, bool _approved)",
    "params":
    [
        {
        "name":"_owner",
        "type":"address",
        "indexed":true,
        "decoded":true,
        "value":"0xa79e63e78eec28741e711f89a672a4c40876ebf3"
        }, 
        {"name":"_operator", "type":"address","indexed":true,"decoded":true,"value":"0x00000000000111abe46ff893f3b2fdf1f759a8a8"},
        {"name":"_approved","type":"bool","indexed":false,"decoded":true,"value":true}
    ]
}

*/






