import { useState } from 'react';
import { motion } from 'framer-motion';

const VideoDemo = () => {
  const videos = [
    {
      title: 'Device Management',
      src: '/videos/R5_1_2D_Controls.mp4',
      description: 'Smart device configuration and management interface showcasing real-time updates and responsive controls.'
    },
    {
      title: 'Adding Devices',
      src: '/videos/R5_1_2D_AddingDevices.mp4',
      description: 'Smart device configuration and management interface showcasing real-time updates and responsive controls.'
    },
    {
      title: 'Advanced Layout System',
      src: '/videos/R5_1_2D_FloorView_AdvancedPlacement.mp4',
      description: 'Sophisticated layout management system with drag-and-drop functionality and precise positioning tools.'
    },
    {
      title: 'Interactive Editor',
      src: '/videos/R5_1_2D_FloorView_BasicEditOptions.mp4',
      description: 'Intuitive editing interface with real-time preview and customizable options for enhanced user experience.'
    },
    {
      title: 'Delete Functionality',
      src: '/videos/R5_1_2D_FloorView_Delete.mp4',
      description: 'Delete options for devices and groups.'
    },
    {
      title: 'Layer Placement',
      src: '/videos/R5_1_2D_FloorView_SetToLayer.mp4',
      description: 'Set devices to layers.'
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <div className="space-y-6">
      {/* Main Video Player */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <video
          key={selectedVideo.src}
          className="w-full h-full"
          controls
          autoPlay
          muted
        >
          <source src={selectedVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Title and Description */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium">{selectedVideo.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{selectedVideo.description}</p>
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {videos.map((video) => (
          <motion.button
            key={video.src}
            onClick={() => setSelectedVideo(video)}
            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all
              ${video.src === selectedVideo.src
                ? 'border-primary'
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <video
              className="w-full h-full object-cover"
              muted
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            >
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <span className="text-white text-sm font-medium px-2 text-center">
                {video.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VideoDemo;
