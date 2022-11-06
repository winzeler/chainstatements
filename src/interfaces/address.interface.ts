
import { AddressStatus } from '../config/constants';

export interface IAddress {
  /** address id */
  _id: string;
  /** future user id */
  user_id: string;
  /** optional email */
  email?: string;
  /** account address */
  address: string;
  /** chain type string */
  chain: string;
  /** blockchain chain id from covalent */
  chain_id: number;
  /** optional name for addressing reports, messages */
  name?: string;
  /** push protocal flag */
  push: boolean;
  /** xmtp flag */
  xmtp: boolean;
  /** webbook monitor transaction receipts */
  receipts_webbook: boolean;
  /** status */
  status: AddressStatus;
  /** manual disable flag */
  disabled: boolean;
}
export interface IAddressStatus {
  status?: AddressStatus;
}
