import React from 'react';

export const VideoReactIcon = () => {
  return (
    <div className='mt-20'>
      <video width="140" height="260" autoPlay loop muted>
        <source src="/img/videos/3d-react.mp4" type="video/mp4" />
        Tu navegador no admite la reproducción de video.
      </video>
    </div>
  );
}

