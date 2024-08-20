import { Address } from 'viem';

import AddressHash from '@/components/AddressHash';
import TransactionsTable from '@/components/TransactionsTable';
import { ETHERSCAN_BASE_URL } from '@/constants';
import { EtherscanTx } from '@/types';

export default async function Transactions({ address }: { address: Address }) {
  const txs = await getTransactions(address);

  return (
    <div className="flex flex-col">
      <span className="mb-5">
        Transactions for <AddressHash isShort hash={address} />
      </span>
      <TransactionsTable txs={txs} />
    </div>
  );
}

async function getTransactions(address: Address): Promise<EtherscanTx[]> {
  const url = new URL('api', ETHERSCAN_BASE_URL);
  url.searchParams.set('module', 'account');
  url.searchParams.set('action', 'txlist');
  url.searchParams.set('address', address);
  url.searchParams.set('startblock', '0');
  url.searchParams.set('endblock', '99999999');
  url.searchParams.set('page', '1');
  url.searchParams.set('offset', '10');
  url.searchParams.set('sort', 'asc');
  url.searchParams.set('apikey', process.env.ETHERSCAN_API_KEY!);

  const response = await fetch(url.toString());
  const data = await response.json();

  // TODO: test this case
  if (data.status == 0) throw new Error('request failed');
  return data.result;
}
