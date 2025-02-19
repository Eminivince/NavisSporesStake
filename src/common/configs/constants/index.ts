export const routes = [
  {
    path: "staking",
    target: true,
    name: "STAKING",
    hot: false,
    comingSoon: false,
    hidden: false,
  },

  // {
  //   path: 'vesting',
  //   target: false,
  //   name: 'Claim token',
  //   hot: true,
  //   comingSoon: false,
  //   hidden: false,
  // },
];

export enum STATUS {
  PENDING,
  SUCCESS,
  FAIL,
  WARNING,
}
