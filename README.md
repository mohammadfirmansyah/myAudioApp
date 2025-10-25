# 🎵 Multi-Audio Playback App

[![GitHub](https://img.shields.io/badge/GitHub-myAudioApp-blue?logo=github)](https://github.com/mohammadfirmansyah/myAudioApp)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.20-000020?logo=expo)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Aplikasi React Native yang mendemonstrasikan kontrol audio dengan dua audio player independen.

## ✨ Fitur Utama

### 1. **Dual Audio Players**
- Dua audio player yang dapat beroperasi secara independen
- Setiap player memiliki state management tersendiri
- Dapat memutar dua audio secara bersamaan

### 2. **Kontrol Audio Lengkap**
- **Play**: Memulai atau melanjutkan pemutaran audio
- **Pause**: Menghentikan sementara (posisi tetap tersimpan)
- **Stop**: Menghentikan dan mereset audio (membebaskan memori)

### 3. **UI/UX yang Diperbaiki**
- ✅ Button dengan icon DAN text label
- ✅ Status indikator real-time untuk setiap player
- ✅ Layout responsif dengan ScrollView
- ✅ Card-based design dengan shadow
- ✅ Warna dan spacing yang konsisten

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

## 🛠️ Teknologi yang Digunakan

- **React Native** - Framework mobile
- **Expo** - Development platform
- **expo-av** - Audio/Video library
- **React Hooks** - State management (useState)

## 📂 Struktur File yang Dibutuhkan

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

## 🎯 Practice Exercise (Completed)

### ✅ Exercise 1: Add Text to Buttons
**Requirement**: Change the buttons to have text along with the image.

**Implementation**:
- Setiap button sekarang memiliki icon DAN text label
- Menggunakan View wrapper untuk menggabungkan icon dan text
- Text muncul di bawah icon untuk UX yang lebih baik

### ✅ Exercise 2: Add Second Audio Player
**Requirement**: Add another audio and alter your app.

**Implementation**:
- Ditambahkan Audio Player 2 dengan state independen
- Setiap player memiliki kontrol Play, Pause, Stop sendiri
- Status indicator menampilkan state masing-masing player
- Dapat menggunakan audio file berbeda (ganti di require())

## 🚀 Cara Build APK

### Prasyarat:
1. Android Studio terinstall
2. Android SDK terkonfigurasi
3. Node.js dan npm terinstall

### Langkah Build:

1. **Generate folder Android native**:
```bash
npx expo prebuild --platform android
```

2. **Buat file local.properties** (sudah dibuat otomatis):
```properties
sdk.dir=C:\\Users\\moham\\AppData\\Local\\Android\\Sdk
```

3. **Build APK Release**:
```bash
cd android
.\gradlew.bat assembleRelease
```

4. **Lokasi APK hasil build**:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📝 Penjelasan Kode Penting

### State Management untuk Dual Players
```javascript
// Player 1 state
const [isPlaying1, setIsPlaying1] = useState(false);
const [sound1, setSound1] = useState(null);

// Player 2 state - independent dari Player 1
const [isPlaying2, setIsPlaying2] = useState(false);
const [sound2, setSound2] = useState(null);
```

### Generic Audio Functions
Fungsi audio dibuat generic dengan parameters agar dapat digunakan untuk multiple players:
```javascript
async function playSound(sound, setSound, setIsPlaying, audioFile)
async function pauseSound(sound, isPlaying, setIsPlaying)
async function stopSound(sound, setSound, setIsPlaying)
```

### Memory Management
Fungsi `stopSound()` melakukan `unloadAsync()` untuk membebaskan memori:
```javascript
await sound.unloadAsync(); // Penting untuk performa aplikasi
```

## 🎨 Kustomisasi

### Mengganti Audio File:
Ganti path di fungsi `playSound()`:
```javascript
require('./assets/namaFileAudioAnda.m4a')
```

### Menambahkan Player Ketiga:
1. Tambahkan state baru: `isPlaying3`, `sound3`
2. Duplikasi section playerContainer
3. Update callback dengan state yang sesuai

## 📖 Pembelajaran

### Konsep yang Dipelajari:
- ✅ State management dengan multiple useState
- ✅ Async/await untuk operasi audio
- ✅ Component composition (Image + Text dalam Button)
- ✅ StyleSheet best practices dengan komentar
- ✅ Memory management (unload audio)
- ✅ Generic function dengan parameters

## 📄 Lisensi

Project ini dibuat untuk tujuan pembelajaran.

## 👨‍💻 Developer

Mohammad Firmansyah

---
**Note**: Untuk penggunaan production, pertimbangkan untuk menambahkan error handling, loading states, dan audio file validation.
