'use client';

import dynamic from 'next/dynamic';

const AdLayer = dynamic(() => import('@/components/Ads'), { ssr: false });

export default AdLayer;
