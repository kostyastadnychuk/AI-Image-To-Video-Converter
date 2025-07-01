'use client';

import { useParams } from 'next/navigation';
import VideoDetails from '@/components/main/VideoDetails';

export default function VideoDetailPage() 
{
    const params = useParams();
    const detailId = params?.detailId as string; // 타입 캐스팅

  return (
    <div className="bg-gray-100 text-white">
      <VideoDetails 
        title={`Detail for ${detailId}`}
        date="2024-07-22"
        motionStrength={0.55}
        seed={769911393}
        hdQuality="480p"
        videoSrc="/video/video.mp4"
      />
    </div>
  );
};

