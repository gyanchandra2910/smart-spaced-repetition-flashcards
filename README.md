# Smart Spaced Repetition Flashcards

A beautiful, responsive web application for learning with flashcards using spaced repetition techniques.

## Features

### Flashcard Experience

- **Interactive Flashcards**: Flip cards with 3D animations to reveal answers
- **Mobile Gestures**: Swipe left/right on mobile to mark cards as known/unknown
- **Keyboard Navigation**: Use keyboard shortcuts for accessibility

### Spaced Repetition System

- **Smart Algorithm**: Cards you struggle with appear more frequently
- **Retention Optimization**: Spacing effect maximizes long-term memory
- **Progress Tracking**: Detailed stats on your learning journey

### User Interface

- **Modern Design**: Clean, distraction-free interface with glassmorphism effects
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Fully Responsive**: Works beautifully on all devices

### Data Management

- **Local Storage**: All data is saved in your browser
- **Import/Export**: Backup and transfer your cards between devices
- **Card Management**: Create, edit, and organize your flashcards

## Technology Stack

- **React**: For building the user interface
- **Tailwind CSS**: For styling and responsive design
- **Framer Motion**: For smooth animations and transitions
- **React Router**: For navigation between pages
- **Recharts**: For data visualization in the dashboard

## Getting Started

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/smart-spaced-repetition-flashcards.git
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Add Flashcards**: Navigate to the Dashboard and create new cards
2. **Study**: Go to the Study page to review cards due for review
3. **Track Progress**: View your stats in the Dashboard
4. **Export Regularly**: Backup your data using the Export function

## Spaced Repetition Algorithm

The app uses a modified version of the SM-2 algorithm, similar to what's used in Anki:

1. Each card has an "ease factor" starting at 2.5
2. If you know a card, its interval increases by its ease factor
3. If you don't know a card, it's reset to be reviewed again soon
4. The ease factor increases slightly for correct answers and decreases for incorrect ones

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## License

MIT License - feel free to use and modify this project for your own purposes.

## Acknowledgements

- Inspired by spaced repetition systems like Anki and SuperMemo
- Icons provided by Heroicons
- Open source libraries that made this project possible

---

Made with ❤️ for effective learning
