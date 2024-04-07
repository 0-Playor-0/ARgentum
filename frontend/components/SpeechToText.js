import axios from 'axios';
import { Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import OpenAI from "openai";
import TTSComponent from './TextToSpeech';

const openai = new OpenAI({apiKey : process.env.APIKEY, dangerouslyAllowBrowser:true});

const AudioTranscriber = ({ setIsSpeaking }) => {
  const [transcription, setTranscription] = useState('');
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = event => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript + ' ';
        }
      }

      setTranscription(prevTranscription => finalTranscript);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) return;
    if (!recording) {
      recognitionRef.current.start();
      setRecording(true);
    } else {
      recognitionRef.current.stop();
      setRecording(false);
      if (transcription.trim() !== '') {
        console.log(transcription);
        main(transcription.trim());
      }
    }
  };

  async function main(transcription) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: transcription }],
        stream: false,
      });
      
      const generatedText = completion['choices'][0]['message']['content'];
      console.log(generatedText);
      speakText(generatedText);
      checkToxicity(generatedText);
    } catch (error) {
      console.error('Error:', error);
      console.log(completion);
    }
  }
  
  function speakText(text) {
    setIsSpeaking(true);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set the language if needed
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  }
  
  async function checkToxicity(message) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/toxicity_pred', {
        StringInput: message
      });

      const predictions = response.data.split('\n').map(line => line.trim().split(': '));
      let isToxic = false;
      let toxicCategories = [];

      for (const [category, isToxicString] of predictions) {
        if (isToxicString === 'True') {
          isToxic = true;
          toxicCategories.push(category);
        }
      }

      if (isToxic) {
        toast({
          title: `Message is Toxic`,
          description: `The message is toxic for the following categories: ${toxicCategories.join(', ')}.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Message is Not Toxic`,
          description: `The message is not toxic.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <Flex direction="column" justify="center" align="center" height="50vh">
      <Button onClick={handleToggleRecording} colorScheme={recording ? 'red' : 'blue'} size="lg" borderRadius="full" p={0}>
        <Icon as={FaMicrophone} boxSize={6} />
      </Button>
      <Text mt={4} color='gray.100'>{transcription}</Text>
    </Flex>
  );
};

export default AudioTranscriber;