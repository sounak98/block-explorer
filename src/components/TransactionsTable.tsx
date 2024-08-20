'use client';

import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';

import TransactionHash from '@/components/TransactionHash';
import { EtherscanTx } from '@/types';

interface TableRow {
  key: string;
  cells: {
    key: string;
    value: ReactElement | string;
  }[];
}

enum SortOrder {
  AmountAsc,
  AmountDesc,
  TimestampAsc,
  TimestampDesc,
}

export default function TransactionsTable({ txs }: { txs: EtherscanTx[] }) {
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    SortOrder.TimestampDesc,
  );

  useEffect(() => {
    setTableRows(
      txs
        .sort((txA, txB) => {
          switch (sortOrder) {
            case SortOrder.AmountAsc:
              return Number(txA.value) - Number(txB.value);
            case SortOrder.AmountDesc:
              return Number(txB.value) - Number(txA.value);
            case SortOrder.TimestampAsc:
              return Number(txA.timeStamp) - Number(txB.timeStamp);
            default:
            case SortOrder.TimestampDesc:
              return Number(txB.timeStamp) - Number(txA.timeStamp);
          }
        })
        .map(transformTxToTableRow),
    );
  }, [txs, sortOrder]);

  function getButtonForSortOrder(target: SortOrder, text: string) {
    return (
      <span
        className={clsx(
          sortOrder === target
            ? 'text-gray-400 cursor-not-allowed font-bold'
            : 'text-blue-400 cursor-pointer underline',
        )}
        onClick={() => setSortOrder(target)}
      >
        {text}
      </span>
    );
  }

  return (
    <>
      <div className="flex justify-between border-b border-black pb-1 mb-2">
        <div className="flex-1 text-center">Hash</div>
        <div className="flex-1 text-center flex gap-1 justify-center">
          Amount
          {getButtonForSortOrder(SortOrder.AmountDesc, 'desc')}
          {getButtonForSortOrder(SortOrder.AmountAsc, 'asc')}
        </div>
        <div className="flex-1 text-center flex gap-1 justify-center">
          Timestamp
          {getButtonForSortOrder(SortOrder.TimestampDesc, 'desc')}
          {getButtonForSortOrder(SortOrder.TimestampAsc, 'asc')}
        </div>
      </div>
      {tableRows.length === 0 && (
        <span className="text-center italic">No transactions</span>
      )}
      {tableRows.map((row) => (
        <div key={row.key} className="flex justify-between mb-2 last:mb-0">
          {row.cells.map((cell) => (
            <span key={cell.key} className="flex-1 overflow-hidden text-center">
              {cell.value}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

function transformTxToTableRow(txs: EtherscanTx): TableRow {
  return {
    key: txs.hash,
    cells: [
      {
        key: 'hash',
        value: <TransactionHash isShort hash={txs.hash} />,
      },
      {
        key: 'amount',
        value: `${(Number(txs.value) / 10e18).toFixed(5)} ETH`,
      },
      {
        key: 'timestamp',
        value: new Date(Number(txs.timeStamp) * 1000).toLocaleString(),
      },
    ],
  };
}
