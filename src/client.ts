import { createPublicClient, http } from 'viem';
import { mainnet, polygon } from 'viem/chains';

export const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(),
});
