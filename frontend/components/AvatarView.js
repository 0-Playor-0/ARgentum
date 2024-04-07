'use client'

import React, { useState, useEffect }from 'react';
import { Avatar } from '@readyplayerme/visage';

const AvatarView = ({ isSpeaking, avatarUrl }) => {

  const [animationSrc, setAnimationSrc] = useState("/male-idle-2.fbx");

  React.useEffect(() => {
    if (isSpeaking) {
      setAnimationSrc("/male-idle-3.fbx");
    } else {
      setAnimationSrc("/male-idle-2.fbx");
    }
  }, [isSpeaking]);

  return (

    <div style={{ width: '100%', height: '100vh' }}>

    <Avatar
      animationSrc={animationSrc}
      backLightColor="#FFB878"
      backLightIntensity={6}
      backLightPosition={{ x: 0, y: 0, z: 0 }} // Adjust the position as needed
      background={{ color: 'rgb(9,20,26)' }}
      bloom={{
        intensity: 0.1,
        kernelSize: 1,
        luminanceSmoothing: 1,
        luminanceThreshold: 1,
        materialIntensity: 3.3,
        mipmapBlur: true
      }}
      cameraInitialDistance={3.2}
      cameraTarget={1.65}
      cameraZoomTarget={{ x: 0, y: 0, z: 0 }} // Adjust the position as needed
      emotion={{}} // You can specify emotions if needed
      environment="soft"
      fillLightColor="#6794FF"
      fillLightIntensity={3}
      fillLightPosition={{ x: 0, y: 0, z: 0 }} // Adjust the position as needed
      fov={50}
      keyLightColor="#FFFFFF"
      keyLightIntensity={0.8}
      lightTarget={{ x: 0, y: 0, z: 0 }} // Adjust the position as needed
      modelSrc={avatarUrl}
      onLoaded={() => console.log('Avatar loaded')} // Handle loaded event if needed
      onLoading={() => console.log('Avatar loading')} // Handle loading event if needed
      scale={1}
      shadows
      style={{}} // Apply any additional styles if needed
    />
    </div>
  );
};

export default AvatarView;
