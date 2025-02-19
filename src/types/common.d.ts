type Token = {
  name: string;
  price: number;
  symbol: string;
  icon_uri?: string;
  project_uri?: string;
  address: string;
  peg: number;
  decimals?: number;
  wrapAddress?: string;
  type: string;
};
type UserInfo = {
  referralCode: string;
  wallet: string;
  deletedAt: string;
  nonce: string;
  referredBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  rank: string;
  friendRefer: string;
  totalFriendStaked: number;
};
type AppContextState = {
  // userQuota: UserQuota | null;
  feEnv: any;
  userInfo: UserInfo;
  refetchUserInfo: () => void;
};

type Round = {
  type: string;
  startTime: string;
  endTime: string;
  vip_access_only: boolean;
};

type Section1 = {
  campaignType?: string;
  name?: string;
  created_address: string;
  registrationTime: string;
  startTime?: string;
  endTime: string;
  poolType?: number;
  totalRaise: string;
  tokenPrice?: string;
  distributedNetwork?: string;
  distributedInfo?: string;
  currencies?: string[];
  avatar?: string;
  cover?: string;
  video_cover?: string;
  extraInformationImageUrl?: string;
  displayClaimingPageUrl?: string;
  claimingPageUrl?: string;
  safeguardType?: number;
  safeguardTokenAddress?: string;
  safeguardFinanceWallet?: string;
  safeguardEnable?: boolean;
  safeguardUrl?: string;
  vesting_enable?: boolean;
  vesting_contract_address?: string;
  treasure_contract_address?: string;
  refundsEnable?: boolean;
  refund_end_time?: string;
  refund_start_time?: string;
  promotion?: string;
  nft_type?: string;
  method?: string;
  vesting?: string;
  on_banner?: boolean;
  popup_enable?: boolean;
  popup_img?: string;
  popup_url?: string;
  distributedNetworkDisplay?: string;
};

type Section2 = {
  tokenName?: string;
  initialCirculatingSupply?: string;
  totalSupply?: string;
  tokenListingDate?: string;
  initialMarketCap?: string;
  vestingDetails?: number;
  vestingEnable: boolean;
  description?: any;
  shortDescription?: string;
};
type Section3 = {
  base_allocation?: string;
  rounds: Round[];
};

type Section4 = {
  end_weight: number;
  pool_address: string;
  project_token_address: string;
  project_token_quantity: string;
  project_token_decimal: number;
  sale_token_address: string;
  sale_token_quantity: string;
  sale_token_decimal: number;
  start_weight: number;
  curated: boolean;
  selling_allowed: boolean;
};

type Campaign = {
  id: string;
  type: string;
  status: number;
  rawId: string;
  isPrivate?: boolean;
  section1: Section1;
  section2: Section2;
  section3: Section3;
  section4: Section4;
};

type RegistrationInfo = {
  id: string;
  vip_level_id: any;
  user_id: string;
  campaign_id: string;
  added_by_admin_id: any;
  receivingWallet: string;
  email: string;
  telegram: string;
  twitter: string;
  discord: string;
  status: string;
  allocate: number;
  created_at: string;
  updated_at: string;
};

type StakeInfo = {
  reward_amount: string;
  stake_amount: string;
  start_time: string;
  claimed_amount: string;
};

type PollInfo = {
  id: string;
  pool_name: string;
  type: number;
  start_at: string;
  close_at: string;
  est_apr: [
    {
      time: number;
      value: number;
    },
  ];
  staking_cap: number;
  network: string;
  token_name: string;
  token_address: string;
  status: number;
  contract_address: string;
  pool_index: number;
  details_url: any;
  counting_enable: boolean;
  deletedAt: any;
  lock_duration: number;
  apr: number;
};

type VipLevel = {
  amount: number;
  required: number;
  vip: string;
  walletAddress: string;
};
