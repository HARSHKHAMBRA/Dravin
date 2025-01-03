import axios from 'axios';

export const convertTextToSpeech = async (text: string) => {
  const response = await axios.post('https://tts-api-url', {
    text,
    voice: 'en-US-Wavenet-D', // Example voice
  });
  return response.data.audioContent; // Base64 or audio file URL
};
