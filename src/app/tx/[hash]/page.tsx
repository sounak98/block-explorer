import { Address } from 'viem';

import { ethClient } from '@/client';
import AddressHash from '@/components/AddressHash';
import TransactionHash from '@/components/TransactionHash';

export default async function TxPage({
  params,
}: {
  params: { hash: Address };
}) {
  const tx = await ethClient.getTransaction({
    hash: params.hash,
  });
  const txReceipt = await ethClient.getTransactionReceipt({
    hash: params.hash,
  });

  return (
    <div className="w-full flex flex-col items-center py-[100px]">
      <div className="w-[800px]">
        <div className="card flex flex-col gap-1 mb-5">
          <span>
            Transaction Hash: <TransactionHash isShort hash={params.hash} />
          </span>
          <span>
            From: <AddressHash hash={tx.from} />
          </span>
          <span>
            To: <AddressHash hash={tx.to} />
          </span>
          <span>Amount: {tx.value.toString()} wei</span>
          <span>Gas: {tx.gas.toString()}</span>
          <span>Gas Price: {tx.gasPrice?.toString()} wei</span>
          <span>Status: {txReceipt.status}</span>
        </div>
      </div>
    </div>
  );
}

// <h1>Transaction: {params.hash}</h1>
// <h1>From: {tx.from}</h1>
// <h1>To: {tx.to}</h1>
// <h1>Amount: {tx.value.toString()}</h1>
// <h1>Gas: {tx.gas.toString()}</h1>
// <h1>Gas Price: {tx.gasPrice?.toString()}</h1>
// <h1>Status: {txReceipt.status}</h1>
