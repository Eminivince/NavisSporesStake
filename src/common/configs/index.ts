export const enum envNane {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  STG = "staging",
}

// export const ENV = process.env.CURRENT_NETWORK;
export const ENV: any = envNane.MAINNET;
// export const ENV: envNane = envNane.TESTNET;

export const config = {
  API_ENDPOINT_URL: "https://staking-api-2.unicelab.io/",
  API_IDO_ENDPOINT_URL: process.env.API_IDO_ENDPOINT_URL,
  APTOS_SCAN_URL: process.env.APTOS_SCAN_URL,
  STAKING_CONTRACT: "0xf52027FFDC5f97931f137c11e03402305A1Bb5fa",
};

export const campaignId = process.env.CAMPAIGN_ID;
export const coinAddress = process.env.COIN_ADDRESS;
export const pool91Address = process.env.POOL_91_ADDRESS;
export const pool182Address = process.env.POOL_182_ADDRESS;

//Testnet
export const tokenAddress =
  ENV === envNane.TESTNET
    ? "0xb84c75479bb9e7cf635ebb216e13c159c2647444"
    : "0xA0CF89eE581313D84d28409Eb6BB1D1F9B55d410";
export const contractAddress =
  ENV === envNane.TESTNET
    ? "0xDe86488e46ACBe88D9e352296419d6EC7E800C1F"
    : "0x0a06EF3CB550eea678C2b1D329e685a902324Fe5";

//Mainnet
// export const tokenAddress = '0xA0CF89eE581313D84d28409Eb6BB1D1F9B55d410';
// export const contractAddress = '0x0a06EF3CB550eea678C2b1D329e685a902324Fe5';

export const MAX_INT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

export const DEFAULT_DECIMALS = 8;

export const dateFormat = "MMMM DD YYYY HH:mm (UTC)";

export const lockCooldownFormat = "MMM DD, YYYY";

export const AMOUNT_TOKEN_FOR_FREE_GAS = 100000 * 1e18;

export const STAKED_TOKEN = "0xb84C75479bB9e7Cf635eBB216E13C159C2647444";
