import axios from 'axios';
import config from './config';
import { API_HOST } from './config/constants';
import { 
  WalletBalance, 
  WalletBalanceItem, 
  HistoricalPortfolioValue, 
  HistoricalPortfolioValueItem, 
  Pagination, 
  DailyQuote, 
  Quote, 
  TokenResponse, 
  BlockTransactionWithContractTransfers,
  TokenTransferItem, 
  MethodCallsForTransfers, 
  TransactionResponse, 
  BlockTransactionWithLogEvents, 
  SingleTransactionResponse, 
  LogEventItem, 
} from './interfaces';
import { Chain, ChainId } from './types';

// axios-concurrency
interface Options {
  endPoint: string;
  floodControl: boolean;
  debugMode: boolean;
  parallelRequests: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class CovalentHQAPI {
  private readonly options: Options = {
    endPoint: config.apiHost,
    floodControl: true,
    debugMode: false,
    parallelRequests: 1,
  };
  private readonly apiKey: string;
  private lastRequestDate: Date = new Date('1970-01-01');

  public constructor(apiKey: string, options?: Partial<Options>) {
    this.apiKey = apiKey;
    this.options = {
      ...this.options,
      ...options,
    }
  }

  // NOTE: user tracks covalent pagination, could be improved with getPagination wrapper

  public async getTokenBalancesForAddress (address: string, chainId: ChainId): Promise<WalletBalance> {
    const url = `${this.options.endPoint}/v1/${chainId}/address/${address}/balances_v2/?key=${this.apiKey}`;
    return this.get<WalletBalance>(url);
  }


  public async getTransaction (hash: string, chainId: ChainId): Promise<SingleTransactionResponse> { 
    const url = `${this.options.endPoint}/v1/${chainId}/transaction_v2/${hash}/?key=${this.apiKey}`;
    return this.get<SingleTransactionResponse>(url);
  };

  public async getTransactions (address: string, chainId: ChainId, pagination: Pagination): Promise<TransactionResponse> {
    const url = `${this.options.endPoint}/v1/${chainId}/address/${address}/transactions_v2/?key=${this.apiKey}`;
    return this.get<TransactionResponse>(url, pagination);
  }
  
  public async getHistoricalPortfolioValue (address: string, chainId: ChainId, pagination: Pagination): Promise<HistoricalPortfolioValue> {
    const url = `${this.options.endPoint}/v1/${chainId}/address/${address}/portfolio_v2/?key=${this.apiKey}`;
    return this.get<HistoricalPortfolioValue>(url, pagination);
  }


  public async getTokenMetadata (chainId: ChainId, contractAddress: string): Promise<TokenResponse> {
    const url = `${this.options.endPoint}/v1/${chainId}/tokens/${contractAddress}/?key=${this.apiKey}`;
    return this.get<TokenResponse>(url);
  }

  public async getBlockTransactionWithContractTransfers (chainId: ChainId, blockHeight: number): Promise<BlockTransactionWithContractTransfers> {
    const url = `${this.options.endPoint}/v1/${chainId}/block_v2/${blockHeight}/?key=${this.apiKey}`;
    return this.get<BlockTransactionWithContractTransfers>(url);
  }

  public async getBlockTransactionWithLogEvents (chainId: ChainId, blockHeight: number): Promise<BlockTransactionWithLogEvents> {
    const url = `${this.options.endPoint}/v1/${chainId}/block_v2/${blockHeight}/?key=${this.apiKey}`;
    return this.get<BlockTransactionWithLogEvents>(url);
  }

  public async getMethodCallsForTransfers (chainId: ChainId, contractAddress: string, methodSignature: string, pagination: Pagination): Promise<MethodCallsForTransfers> {
    const url = `${this.options.endPoint}/v1/${chainId}/address/${contractAddress}/transfers_v2/?key=${this.apiKey}`;
    return this.get<MethodCallsForTransfers>(url, pagination);
  }

  public async getTokenTransfers (chainId: ChainId, contractAddress: string, pagination: Pagination): Promise<TokenTransferItem> {
    const url = `${this.options.endPoint}/v1/${chainId}/address/${contractAddress}/transfers_v2/?key=${this.apiKey}`;
    return this.get<TokenTransferItem>(url, pagination);
  }

  public async getLogEvents (chainId: ChainId, contractAddress: string, pagination: Pagination): Promise<LogEventItem> {
    const url = `${this.options.endPoint}/v1/${chainId}/address/${contractAddress}/events_v2/?key=${this.apiKey}`;
    return this.get<LogEventItem>(url, pagination);
  }

  

  // flood control get and axios-concurrency inspired by simplehash-api module
  private async get<T>(url: string, params = {}): Promise<T> {
    await this.waitForFloodControl();
    try {
      const response = await axios.get<T>(
        url,
        {
          params,
          headers: {
            Accept: 'application/json',
            // 'x-api-key': this.apiKey,
          },
        }
      );
      const json = response.data;
      return json;
    } catch (error) {
      console.error(error);
    }

    return {} as T;
  }

  private async waitForFloodControl() {
    if (this.options.floodControl) {
      const now = new Date();
      const diff = now.getTime() - this.lastRequestDate.getTime();
      if (diff < 100) {
        await sleep(100);
      }
    }
    this.lastRequestDate = new Date();
  }
}




function createAPI (apiKey: string, options?: Partial<Options>) {
  return new CovalentHQAPI(apiKey, options);
}

export {
  createAPI,
  Options,
};