export interface Strategy {
  id: string;
  createdAtTimestamp: string;
  amount0: string;
  amount1: string;
  shares: string;
  txCount: string;
  name: string;
  owner: string;
  userCount: string;
  type: DataFeed;
  hash: string;
  pool: string;
  unusedAmount0: string;
  unusedAmount1: string;
  feeTier: string;
  token0: Token;
  token1: Token;
  adds: Add[];
  removes: Add[];
  since_inception: { USD: number };
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  onHold: boolean;
  address: string;
  dataFeed: DataFeed;
  subTitle: null | string;
  title: string;
  aum: number;
  apy: number;
}

export interface Add {
  id: string;
  timestamp: string;
  amount0: string;
  amount1: string;
  __typename: AddTypename;
}

export enum AddTypename {
  Add = 'Add',
  Remove = 'Remove',
}

export enum DataFeed {
  Chainlink = 'Chainlink',
  Twap = 'Twap',
}

export interface Token {
  id: string;
  totalSupply: string;
  name: string;
  symbol: string;
  decimals: string;
  __typename: Token0Typename;
}

export enum Token0Typename {
  Token = 'Token',
}
