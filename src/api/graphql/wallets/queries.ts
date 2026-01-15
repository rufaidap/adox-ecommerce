import {gql} from '@apollo/client';

export const WALLETS = gql`
  query Wallets(
    $size: Int
    $page: Int
    $wallet: Wallet_
    $search: String
    $orderBy: SortInput
  ) {
    wallets(
      size: $size
      page: $page
      wallet: $wallet
      search: $search
      orderBy: $orderBy
    ) {
      currentPage
      totalPages
      totalData
      data {
        id
        balance
        status
      }
    }
  }
`;
