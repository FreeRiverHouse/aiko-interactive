# AIKO Interactive - Build Instructions

## App Status
- **MVP**: COMPLETE
- **Web**: Running at http://localhost:8081
- **Features**: 8 chapters, 25+ quiz questions, progress tracking

## EAS Build (Requires Manual Login)

### Step 1: Login to Expo
```bash
cd /Users/mattiapetrucciani/CascadeProjects/aiko-interactive
eas login
```

### Step 2: Configure Project
```bash
eas build:configure
```

### Step 3: Build for iOS
```bash
eas build --platform ios
```

### Step 4: Build for Android
```bash
eas build --platform android
```

### Step 5: Submit to App Store
```bash
eas submit --platform ios
eas submit --platform android
```

## App Store Details

- **Bundle ID**: com.freeriverhouse.aiko
- **App Name**: AIKO - AI for Kids
- **Publisher**: Onde, Free River House
- **Category**: Education / Kids
- **Price**: FREE

## Assets Needed for Store

- [x] App Icon (use cover image)
- [ ] Screenshots (iPhone, iPad)
- [ ] App Store description
- [ ] Privacy policy URL
- [ ] Support URL

## Quick Commands

```bash
# Start dev server
npm start

# Run on web
npm run web

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```
