# AIKO Interactive

Educational app for children (ages 5-8) based on the book "AIKO: AI Explained to Children".

## Features

- 8 interactive chapters with beautiful watercolor illustrations
- Quiz system with 25+ questions
- Progress tracking
- Kid-friendly UI
- Multi-language support (coming soon)

## Tech Stack

- React Native + Expo
- TypeScript
- Expo Router for navigation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Project Structure

```
aiko-interactive/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   ├── chapter/[id].tsx   # Chapter detail screen
│   └── quiz/[id].tsx      # Quiz screen
├── assets/
│   └── images/chapters/   # Book illustrations
├── components/            # Reusable UI components
└── data/
    ├── chapters.json      # Chapter content
    └── quizzes.json       # Quiz questions
```

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Publisher

Onde, Free River House

## License

All rights reserved.
