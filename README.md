# 🎵 Multi-Audio Playback App

[![GitHub](https://img.shields.io/badge/GitHub-myAudioApp-blue?logo=github)](https://github.com/mohammadfirmansyah/myAudioApp)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.20-000020?logo=expo)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A React Native application that demonstrates advanced audio control with two independent audio players. Perfect for learning audio management and state handling in mobile apps!

## 📚 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - Learn how to contribute to this project
- **[Build Information](BUILD_INFO.md)** - APK build details and testing checklist
- **[Changelog](CHANGELOG.md)** - Version history and release notes

## ✨ Key Features

### 1. **Dual Independent Audio Players**
- Two audio players that operate completely independently
- Each player manages its own state separately
- Play two different audio tracks simultaneously without conflicts

### 2. **Complete Audio Controls**
- **Play**: Start or resume audio playback from current position
- **Pause**: Temporarily halt playback while preserving position
- **Stop**: End playback and free up memory resources

### 3. **Enhanced UI/UX**
- ✅ Buttons with both icons AND text labels for clarity
- ✅ Real-time status indicators for each player
- ✅ Responsive layout with ScrollView support
- ✅ Modern card-based design with elegant shadows
- ✅ Consistent color scheme and spacing throughout

## 📱 Tampilan Aplikasi

```
┌─────────────────────────────────┐
│  Multi-Audio Playback App       │
│  Control two independent tracks  │
├─────────────────────────────────┤
│  🎵 Audio Track 1                │
│  Sample Audio                    │
│                                  │
│  [▶ Play] [⏸ Pause] [⏹ Stop]   │
│  Status: ⏸️ Stopped              │
├─────────────────────────────────┤
│  🎵 Audio Track 2                │
│  Alternative Audio               │
│                                  │
│  [▶ Play] [⏸ Pause] [⏹ Stop]   │
│  Status: ⏸️ Stopped              │
└─────────────────────────────────┘
```

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and toolkit
- **expo-av** - Professional Audio/Video library
- **React Hooks** - Modern state management with useState

## 📂 Required File Structure

```
myAudioApp/
├── App.js                              # Main application file
├── assets/
│   ├── sampleAudioForReactnative.m4a  # Audio file 1
│   ├── play.png                        # Play button icon
│   ├── pause.png                       # Pause button icon
│   └── stop.png                        # Stop button icon
├── package.json
└── app.json
```

## 🎯 Practice Exercises (Completed!)

### ✅ Exercise 1: Add Text to Buttons
**Requirement**: Change the buttons to have text along with the image.

**Implementation**:
- Each button now features both an icon AND a text label
- Uses a View wrapper to combine icon and text elegantly
- Text appears below the icon for better user experience

### ✅ Exercise 2: Add Second Audio Player
**Requirement**: Add another audio track and enhance your app.

**Implementation**:
- Added Audio Player 2 with completely independent state
- Each player has its own Play, Pause, and Stop controls
- Status indicators display the state of each player separately
- Easily customize by swapping audio files in the require() statement

## 🚀 How to Build APK

### Prerequisites:
1. Android Studio installed on your system
2. Android SDK properly configured
3. Node.js and npm installed

### Build Steps:

1. **Generate Android native folder**:
```bash
npx expo prebuild --platform android
```

2. **Create local.properties file** (automatically generated):
```properties
sdk.dir=C:\\Users\\moham\\AppData\\Local\\Android\\Sdk
```

3. **Build Release APK**:
```bash
cd android
.\gradlew.bat assembleRelease
```

4. **Find your APK here**:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📝 Important Code Explanations

### State Management for Dual Players
```javascript
// Player 1 state
const [isPlaying1, setIsPlaying1] = useState(false);
const [sound1, setSound1] = useState(null);

// Player 2 state - completely independent from Player 1
const [isPlaying2, setIsPlaying2] = useState(false);
const [sound2, setSound2] = useState(null);
```

### Generic Audio Functions
Audio functions are designed to be generic with parameters, making them reusable for multiple players:
```javascript
async function playSound(sound, setSound, setIsPlaying, audioFile)
async function pauseSound(sound, isPlaying, setIsPlaying)
async function stopSound(sound, setSound, setIsPlaying)
```

### Memory Management
The `stopSound()` function uses `unloadAsync()` to free up memory resources:
```javascript
await sound.unloadAsync(); // Essential for optimal app performance
```

## 🎨 Customization Guide

### Changing Audio Files:
Simply update the path in the `playSound()` function:
```javascript
require('./assets/yourAudioFileName.m4a')
```

### Adding a Third Player:
1. Add new state variables: `isPlaying3`, `sound3`
2. Duplicate the playerContainer section
3. Update callbacks with the appropriate state

## 📖 Learning Outcomes

### Concepts Covered:
- ✅ State management with multiple useState hooks
- ✅ Async/await for audio operations
- ✅ Component composition (combining Image + Text in Buttons)
- ✅ StyleSheet best practices with clear comments
- ✅ Memory management (properly unloading audio)
- ✅ Generic functions with parameters for reusability

## 📄 License

This project is created for educational purposes under the MIT License.

## 👨‍💻 Developer

Mohammad Firman Syah

---
**Note**: For production use, consider adding error handling, loading states, and audio file validation to make your app more robust and user-friendly.
