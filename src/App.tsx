import React, { useState, useEffect } from 'react';
import { Planet } from 'react-kawaii';
import './App.css';

function App() {
  const moods = ['sad', 'shocked', 'happy', 'blissful', 'lovestruck', 'excited', 'ko'] as const;
  type MoodType = typeof moods[number];

  const [mood, setMood] = useState<MoodType>('happy');
  const [color, setColor] = useState<string>('#FDA7DC');
  const [bgColor, setBgColor] = useState<string>('#f5f7fa');
  const [animate, setAnimate] = useState(false);


  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/click.wav');
    audio.preload = 'auto'; 
    audio.onerror = () => console.error('音频文件加载失败');
    setClickSound(audio);
  }, []);

  const getContrastColor = (hex: string) => {
    const r = 255 - parseInt(hex.slice(1, 3), 16);
    const g = 255 - parseInt(hex.slice(3, 5), 16);
    const b = 255 - parseInt(hex.slice(5, 7), 16);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const changeMood = () => {
    if (!clickSound) {
      console.log('音频未加载');
      return;
    }

    const randomIndex = Math.floor(Math.random() * moods.length);
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    clickSound.play().catch((error) => {
      console.error('音频播放失败:', error);
    });

    setAnimate(true);
    setMood(moods[randomIndex]);
    setColor(newColor);
    setBgColor(getContrastColor(newColor));
    setTimeout(() => setAnimate(false), 500);
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <h1>Kawaii/可愛的 <br /> Mood changes/情緒變化</h1>
      <div className={`kawaii-container ${animate ? 'animate' : ''}`}>
        <Planet size={200} mood={mood} color={color} />
      </div>
      <button className="kawaii-button" onClick={changeMood}>
        Changes/變化
      </button>
    </div>
  );
}

export default App;