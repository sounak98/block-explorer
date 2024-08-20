import { ReactElement } from 'react';

export default function Card({ children }: { children: ReactElement }) {
  return <div className="border border-black p-5 mb-5">{children}</div>;
}
