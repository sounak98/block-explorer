'use client';

import Link from 'next/link';

export default function AddressHash({
  hash,
  isShort = false,
}: {
  hash: string;
  isShort?: boolean;
}) {
  return (
    <Link href={`/address/${hash}`} className="underline text-blue-400">
      {!isShort ? hash : `${hash.slice(0, 6)}...${hash.slice(-4)}`}
    </Link>
  );
}
