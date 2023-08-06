import dynamic from 'next/dynamic';

const Collections = dynamic(
  () => import('@/components/templates/Collections'),
  {
    ssr: false,
  }
);
import { FC } from 'react';

interface indexProps {}

const index: FC<indexProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Collections />
    </div>
  );
};

export default index;
