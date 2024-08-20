import { normalize } from 'path';
import { getAddress } from 'viem';

import { ethClient } from '@/client';
import AddressHash from '@/components/AddressHash';

import Transactions from './transactions';

export default async function AddressPage({
  params,
}: {
  params: { hash: string };
}) {
  const address =
    (await ethClient.getEnsAddress({ name: normalize(params.hash) })) ??
    getAddress(params.hash);
  const balance = await ethClient.getBalance({ address });
  const txCount = await ethClient.getTransactionCount({ address });

  return (
    <div className="w-full flex flex-col items-center py-[100px]">
      <div className="w-[800px]">
        <div className="card flex flex-col gap-1 mb-5">
          <span>
            Address: <AddressHash hash={address} />
          </span>
          <span>
            Balance: {(Number(balance.toString()) / 10e18).toFixed(5)} ETH
          </span>
          <span>Transaction Count: {txCount.toString()}</span>
        </div>
        <div className="card">
          <Transactions address={address} />
        </div>
      </div>
    </div>
  );
}
