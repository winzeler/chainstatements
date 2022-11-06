export enum AddressStatus {
    'pending' = 'pending',
    'sending' = 'sending',
    'success' = 'success',
    'failed' = 'failed',
    'removed' = 'removed',
  }
  

  export const AddressStatusValues = Object.keys(AddressStatus) as AddressStatus[];
