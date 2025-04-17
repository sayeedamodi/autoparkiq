import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const VideoView = () => {
  const [showFeed, setShowFeed] = useState(false);

  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
      <Button
        variant="outlined"
        size="small"
        onClick={() => setShowFeed(prev => !prev)}
        sx={{ textTransform: 'none', mb: 2 }}
      >
        {showFeed ? 'Hide Live View' : 'View Live Feed'}
      </Button>

      {showFeed && (
        <iframe
          src="http://localhost:5000/video-feed"
          width="320"
          height="240"
          style={{ border: '1px solid #ccc', borderRadius: 4 }}
          allow="autoplay"
          title="Live Video Feed"
        />
      )}
    </Box>
  );
};

export default VideoView;
