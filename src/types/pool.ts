enum PoolType {
  Type1 = 1,
  Type2 = 2,
  // Add other types as needed
}

enum PoolStatus {
  Active = 1,
  Closed = 2,
  // Add other statuses as needed
}
interface IEstApr {
  time: number;
  value: number;
}
export interface IPool {
  id: string;
  pool_name: string;
  type: PoolType;
  start_at: string;
  close_at: string;
  token_address: string;
  status: PoolStatus;
  contract_address: string;
  pool_index: number;
  weight: number;
  details_url: string | null;
  counting_enable: boolean;
  deletedAt: string | null;
  stakedInfo: string;
  chainId: number;
  est_apr: IEstApr[];
  stakingCap: string;
}
