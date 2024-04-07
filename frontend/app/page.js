'use client'

import { ChakraProvider, Box } from '@chakra-ui/react';
import  React, { useState } from 'react'
import AudioTranscriber from '@/components/SpeechToText';
import TTSComponent from '@/components/TextToSpeech';
import AvatarView from '@/components/AvatarView';
import AvatarMaker from '@/components/AvatarCreator';

export default function Home() {
   
  const [isSpeaking,  setIsSpeaking] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/66113a6ae5acc0912ece2dc0.glb')

  const dummyURL = 'https://models.readyplayer.me/66113a6ae5acc0912ece2dc0.glb'
  return (
    <ChakraProvider>
      <Box backgroundColor='gray.700'>
      <AvatarMaker setAvatarUrl={setAvatarUrl}/>
        <AudioTranscriber setIsSpeaking={setIsSpeaking}/>
      <AvatarView avatarUrl={avatarUrl} isSpeaking={isSpeaking}/>
      </Box>
    </ChakraProvider>
  );
}
