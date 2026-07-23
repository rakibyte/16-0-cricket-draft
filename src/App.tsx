import React from 'react';
import { Header } from './components/common/Header';
import { HomePage } from './components/home/HomePage';
import { AllTimeFranchisePicker } from './components/draft/AllTimeFranchisePicker';
import { ReelSpinner } from './components/draft/ReelSpinner';
import { CricketPitch } from './components/pitch/CricketPitch';
import { MatchSimulator } from './components/simulation/MatchSimulator';
import { PlayerPickerModal } from './components/draft/PlayerPickerModal';
import { AdRewardModal } from './components/common/AdRewardModal';
import { ShareModal } from './components/share/ShareModal';
import { MatchScorecardModal } from './components/simulation/MatchScorecardModal';
import { TrophyCabinetModal } from './components/meta/TrophyCabinetModal';
import { LeaderboardModal } from './components/meta/LeaderboardModal';
import { UserProfileModal } from './components/meta/UserProfileModal';
import { AuthModal } from './components/auth/AuthModal';
import { MultiplayerModal } from './components/multiplayer/MultiplayerModal';
import { MultiplayerDraftBanner } from './components/multiplayer/MultiplayerDraftBanner';
import { useGameStore } from './store/useGameStore';

export const App: React.FC = () => {
  const {
    currentView,
    leagueMode,
    selectedAllTimeFranchise,
    availableTeams,
    setSpunTeam,
    setIsAdModalOpen,
    respinTokens,
  } = useGameStore();

  const isAllTimePickerNeeded = leagueMode === 'ALL_TIME_XI' && !selectedAllTimeFranchise;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {currentView === 'HOME' ? (
          <HomePage />
        ) : isAllTimePickerNeeded ? (
          <AllTimeFranchisePicker />
        ) : (
          <>
            {/* Active Multiplayer Room 3-Min Draft Banner */}
            <MultiplayerDraftBanner />

            {/* Top Grid Layout: Left Reel Slot Spinner, Right Cricket Pitch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* [CLUB] x [SEASON] Reel Slot Spinner Column */}
              <div className="lg:col-span-5 glass-panel rounded-3xl p-4 sm:p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[460px]">
                <ReelSpinner
                  teams={availableTeams}
                  onTeamSelected={(team) => setSpunTeam(team)}
                  onOpenAdModal={() => setIsAdModalOpen(true)}
                  respinTokens={respinTokens}
                />
              </div>

              {/* Pitch & Squad Slots Column */}
              <div className="lg:col-span-7">
                <CricketPitch />
              </div>
            </div>

            {/* Bottom Section: 16-0 Tournament & Points Table Simulator */}
            <MatchSimulator />
          </>
        )}
      </main>

      {/* Global Modals */}
      <PlayerPickerModal />
      <AdRewardModal />
      <ShareModal />
      <MatchScorecardModal />
      <TrophyCabinetModal />
      <LeaderboardModal />
      <UserProfileModal />
      <AuthModal />
      <MultiplayerModal />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500 font-medium">
        16-0 Cricket Squad Draft &copy; {new Date().getFullYear()} &bull; The Ultimate Cricket Draft Challenge
      </footer>
    </div>
  );
};

export default App;
