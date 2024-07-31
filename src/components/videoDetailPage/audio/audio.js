import { useEffect } from 'react';
import axios from 'axios';

const TextToSpeech = ({ text, onSpeechEnd }) => {
    //const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let cancelToken = axios.CancelToken.source();

        const synthesizeSpeech = async () => {
            const apiKey = 'AIzaSyDiNyOuUh_if24LAiO0rs20qeYjOwqVXeU';
            const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

            const request = {
                input: { text },
                voice: { languageCode: 'en-US', name: 'en-US-Journey-O', ssmlGender: 'FEMALE' },
                // voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
                audioConfig: { audioEncoding: 'MP3' },
            };

            try {
                const response = await axios.post(endpoint, request, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cancelToken: cancelToken.token,
                });

                const audioContent = response.data.audioContent;
                const audioBlob = new Blob([new Uint8Array(atob(audioContent).split("").map(char => char.charCodeAt(0)))], { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);

                playAudio(audioUrl);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled:', error.message);
                } else {
                    console.error('Error synthesizing speech:', error);
                }
            }
        };

        const playAudio = (url) => {
            const speechAudio = new Audio(url);
            const playPromise = speechAudio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Speech started");
                    //setIsPlaying(true);
                })
                .catch(error => {
                    console.error('Speech playback error:', error);
                });
            }

            speechAudio.onended = () => {
                console.log("Speech ended");
                //setIsPlaying(false);
                if (onSpeechEnd) {
                    onSpeechEnd();
                }
            };
        };

        const timeoutId = setTimeout(() => {
            if (text) {
                synthesizeSpeech();
            }
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
            cancelToken.cancel('Component unmounted');
        };
    }, [text, onSpeechEnd]);

    return null;
};

export default TextToSpeech;