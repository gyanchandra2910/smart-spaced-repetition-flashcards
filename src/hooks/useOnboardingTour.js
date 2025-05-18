import { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';

/**
 * Custom hook to manage onboarding tour using react-joyride
 * Handles tour state, persistence in localStorage, and tour steps definition
 * 
 * @returns {Object} An object containing:
 *   - TourComponent: The Joyride component to be included in the app
 *   - runTour: Boolean indicating if the tour should run
 *   - resetTour: Function to reset the tour completion status
 */
const useOnboardingTour = () => {
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Check if the tour has been completed before
    const tourCompleted = localStorage.getItem('onboardingTourCompleted');
    
    if (!tourCompleted) {
      setRunTour(true);
    }
      // Define the steps for the tour
    setSteps([
      {
        target: '.flashcard-component',
        content: 'Welcome to Smart Flashcards! Click or tap on a card to flip it and reveal the answer.',
        placement: 'center',
        disableBeacon: true,
        title: 'Flip Cards',
        spotlightClicks: true
      },
      {
        target: '.review-buttons',
        content: 'After reviewing the answer, mark if you knew it or not. Cards you struggle with will appear more frequently based on our spaced repetition algorithm.',
        placement: 'top',
        title: 'Rate Your Knowledge',
        spotlightClicks: true
      },
      {
        target: '.nav-dashboard-link',
        content: 'Visit the Dashboard to track your progress, manage your cards, and view detailed statistics.',
        placement: 'bottom',
        title: 'Check Your Progress',
        spotlightClicks: true
      },
      {
        target: 'footer',
        content: 'Your progress is automatically saved in your browser\'s local storage. You can export your data from the Dashboard to back it up.',
        placement: 'top',
        title: 'Data Storage',
      },
      {
        target: 'body',
        content: 'You can always restart this tour from the settings menu if you need a refresher. Happy learning!',
        placement: 'center',
        title: 'Get Started',
      }
    ]);
  }, []);

  // Handle tour completion
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      localStorage.setItem('onboardingTourCompleted', 'true');
    }
  };

  // Reset tour to show it again
  const resetTour = () => {
    localStorage.removeItem('onboardingTourCompleted');
    setRunTour(true);
  };

  // The Joyride component to be included in the app
  const TourComponent = (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={runTour}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#0ea5e9',
          textColor: '#1e293b'
        }
      }}
    />
  );

  return { TourComponent, runTour, resetTour };
};

export default useOnboardingTour;
