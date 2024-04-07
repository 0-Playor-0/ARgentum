'use client'

import React, { useState, useEffect } from 'react';

const TTSComponent = (fixedPrompt) => {
  const [speaking, setSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null); // Store the selected voice

  useEffect(() => {
    const fetchVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const englishFemaleVoices = voices.filter(voice => voice.lang.startsWith('en') && voice.name.includes('female'));
      setSelectedVoice(englishFemaleVoices[0]); // Select the first English female voice available
    };
  
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
      fetchVoices(); // Fetch voices immediately in case they're already loaded
    }
  }, []);
  

  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && selectedVoice) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(fixedPrompt);
      utterance.voice = selectedVoice; // Set the selected voice
      setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
      };
      synth.speak(utterance);
    } else {
      console.error('Speech synthesis not supported or no voice selected.');
    }
  };

 // You might not need to call this here, it depends on your use case
};

export default TTSComponent;


