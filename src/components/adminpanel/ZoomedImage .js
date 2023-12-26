import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ZoomedImage = ({ imageUrl, onClose }) => {
  return (
    <div>
      {/* <button onClick={onClose}>Close</button> */}
      <TransformWrapper>
        <TransformComponent>
          <img src={imageUrl} alt="Zoomed Image" style={{ width: '100%', height: 'auto' }} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default ZoomedImage;
