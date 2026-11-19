import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { VoiceProvider } from './context/VoiceContext';
import { Onboarding } from './screens/Onboarding';
import { Dashboard } from './screens/Dashboard';
import { StoriesPlayer } from './components/StoriesPlayer';
import { ChatAssistant } from './screens/ChatAssistant';
import { ParentMode } from './screens/ParentMode';
import { FloatingPanicButton } from './components/FloatingPanicButton';
import { PanicOverlay } from './components/PanicOverlay';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';

const MainRouter = () => {
  const { screen } = useApp();

  return (
    <div className="relative min-h-screen bg-stone-50 font-sans">
      {/* Universal Floating Panic / SOS Quick Camouflage Button */}
      <FloatingPanicButton />

      {/* Screen Router */}
      {screen === 'onboarding' && <Onboarding />}
      {screen === 'dashboard' && <Dashboard />}
      {screen === 'stories' && <StoriesPlayer />}
      {screen === 'chat' && <ChatAssistant />}
      {screen === 'parent' && <ParentMode />}

      {/* Instant Stealth Mode Calculator / Notes Overlay */}
      <PanicOverlay />

      {/* Voice & Language Customization Modal */}
      <VoiceSettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <VoiceProvider>
        <MainRouter />
      </VoiceProvider>
    </AppProvider>
  );
}
