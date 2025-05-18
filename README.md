# Smart Spaced Repetition Flashcards

A beautiful, responsive web application for learning with flashcards using spaced repetition techniques.

🔗 **[Try it now!](https://gyanchandra2910.github.io/smart-spaced-repetition-flashcards/)**

![Flashcards App](public/flash%20card.png)

## Features

### Flashcard Experience

- **Interactive Flashcards**: Flip cards with 3D animations to reveal answers
- **Mobile Gestures**: Swipe left/right on mobile to mark cards as known/unknown
- **Keyboard Navigation**: Use keyboard shortcuts (Space to flip, ← → arrows to mark)
- **Micro-Interactions**: Delightful animations enhance the learning experience

### Spaced Repetition System

- **Smart Algorithm**: Cards you struggle with appear more frequently
- **Retention Optimization**: Spacing effect maximizes long-term memory
- **Progress Tracking**: Detailed stats on your learning journey
- **Edge Case Handling**: Elegant handling of empty states and completion messages

### User Interface

- **Modern Design**: Clean, distraction-free interface with glassmorphism effects
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Fully Responsive**: Works beautifully on all devices
- **Interactive Tour**: Guided onboarding experience for new users

### Data Management

- **Local Storage**: All data is saved in your browser
- **Import/Export**: Backup and transfer your cards between devices
- **Card Management**: Create, edit, and organize your flashcards
- **Data Validation**: Robust error handling for importing flashcard data
- **Offline Support**: Progressive Web App (PWA) functionality for learning without internet

### Accessibility

- **ARIA Attributes**: Enhanced screen reader support
- **Keyboard Navigation**: Complete control without a mouse
- **Focus Management**: Clear visual indicators for keyboard users
- **High Contrast**: Readable text with sufficient color contrast

## Technology Stack

- **React**: For building the user interface
- **Tailwind CSS**: For styling and responsive design
- **Framer Motion**: For smooth animations and transitions
- **React Router**: For navigation between pages
- **Recharts**: For data visualization in the dashboard
- **React Joyride**: For guided tours and onboarding
- **Service Workers**: For offline functionality (PWA)

## Getting Started

### Quick Start (Using the Web App)
1. Visit [https://gyanchandra2910.github.io/smart-spaced-repetition-flashcards/](https://gyanchandra2910.github.io/smart-spaced-repetition-flashcards/)
2. Create your first flashcard by clicking "Add Card"
3. Start studying with the "Study" button
4. Mark cards as "Known" or "Don't Know" to optimize your learning schedule

### Keyboard Shortcuts
- `Space` or `Enter`: Flip card
- `→` Arrow Right: Mark as known
- `←` Arrow Left: Mark as unknown

### Installation (For Developers)

1. Clone the repository

2. Install dependencies

3. Start the development server

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Add Flashcards**: Navigate to the Dashboard and create new cards
2. **Study**: Go to the Study page to review cards due for review
3. **Track Progress**: View your stats in the Dashboard
4. **Export Regularly**: Backup your data using the Export function

### Testing

The application includes a comprehensive test suite to ensure reliability:

This runs unit tests for components, hooks, and utility functions using Jest and React Testing Library.

## Spaced Repetition Algorithm

The app uses a modified version of the SM-2 algorithm, similar to what's used in Anki:

1. Each card has an "ease factor" starting at 2.5
2. If you know a card, its interval increases by its ease factor
3. If you don't know a card, it's reset to be reviewed again soon
4. The ease factor increases slightly for correct answers and decreases for incorrect ones

## Progressive Web App (PWA)

This application can be installed on your device as a PWA:

1. Visit the app in Chrome, Edge, or other modern browsers
2. Look for the install icon in your address bar
3. Click "Install" to add it to your home screen

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run deploy`

Deploys the application to GitHub Pages.

## License

MIT License - feel free to use and modify this project for your own purposes.

## Acknowledgements

- Inspired by spaced repetition systems like Anki and SuperMemo
- Icons provided by Heroicons
- Open source libraries that made this project possible

---

[View Live Demo](https://gyanchandra2910.github.io/smart-spaced-repetition-flashcards/) | [Report an Issue](https://github.com/gyanchandra2910/smart-spaced-repetition-flashcards/issues) | Made with ❤️ for effective learning