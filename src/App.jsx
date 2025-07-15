import React, { useState, useRef } from 'react';
import IndexPage from './components/IndexPage';
import BirthdayPage from './components/BirthdayPage';
import CakePage from './components/CakePage';
import FinalPage from './components/FinalPage';
import bd_song from './assets/bd_song.mp3';

function App() {
  const [currentPage, setCurrentPage] = useState('index');
  const audioRef = useRef(null);
  const [audioStarted, setAudioStarted] = useState(false);

  const navigateToPage = (page) => {
    // Only play audio when navigating to 'birthday' and not already started
    if (page === 'birthday' && !audioStarted && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.2; // Lower the volume
      audioRef.current.play();
      setAudioStarted(true);
    }
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'index':
        return <IndexPage onNavigate={navigateToPage} />;
      case 'birthday':
        return <BirthdayPage onNavigate={navigateToPage} />;
      case 'cake':
        return <CakePage onNavigate={navigateToPage} />;
      case 'final':
        return <FinalPage onNavigate={navigateToPage} />;
      default:
        return <IndexPage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hidden background audio, will play when entering BirthdayPage */}
      <audio ref={audioRef} src={bd_song} loop style={{ display: 'none' }} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;