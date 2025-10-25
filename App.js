/**
 * React Native Multi-Audio Playback Application
 * This app demonstrates advanced audio control with multiple audio tracks.
 * Features: Dual audio players with independent Play, Pause, and Stop controls.
 * Each player manages its own state and can operate independently.
 */

import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  View, 
  Image,
  ScrollView 
} from 'react-native';
import { useState } from 'react';
import { Audio } from 'expo-av';

export default function App() {
  // State management for Audio Player 1
  // Tracks playback status and sound object for first audio track
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [sound1, setSound1] = useState(null);

  // State management for Audio Player 2
  // Independent state allows simultaneous control of second audio track
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [sound2, setSound2] = useState(null);

  /**
   * Generic play function for any audio track
   * @param {Object|null} sound - Current sound object or null
   * @param {Function} setSound - State setter for sound object
   * @param {Function} setIsPlaying - State setter for playing status
   * @param {string} audioFile - Path to audio file (from require)
   * 
   * Handles three scenarios intelligently:
   * 1. Initial load - creates new audio instance
   * 2. Completed playback - resets and replays
   * 3. Paused state - resumes from last position
   */
  async function playSound(sound, setSound, setIsPlaying, audioFile) {
    if (sound === null) {
      // First play: load audio file into memory
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        audioFile
      );
      setSound(playbackObject);
      await playbackObject.playAsync();
      setIsPlaying(true);
    } else {
      // Get current status to decide next action
      const status = await sound.getStatusAsync();
      
      if (status.positionMillis === status.durationMillis) {
        // Track completed: restart from beginning
        await sound.setPositionAsync(0);
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        // Track paused: continue playback
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  /**
   * Generic pause function for any audio track
   * @param {Object} sound - Sound object to pause
   * @param {boolean} isPlaying - Current playing status
   * @param {Function} setIsPlaying - State setter for playing status
   * 
   * Maintains current position for seamless resume
   */
  async function pauseSound(sound, isPlaying, setIsPlaying) {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  /**
   * Generic stop function for any audio track
   * @param {Object} sound - Sound object to stop
   * @param {Function} setSound - State setter to reset sound
   * @param {Function} setIsPlaying - State setter for playing status
   * 
   * Completely unloads audio from memory for optimal resource management
   */
  async function stopSound(sound, setSound, setIsPlaying) {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      // Memory cleanup: unload audio to free resources
      await sound.unloadAsync();
      // Reset state for fresh initialization
      setSound(null);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Multi-Audio Playback App</Text>
        <Text style={styles.subtitle}>
          Control two independent audio tracks
        </Text>
        
        {/* Audio Player 1 Section */}
        <View style={styles.playerContainer}>
          <Text style={styles.playerTitle}>🎵 Audio Track 1</Text>
          <Text style={styles.playerSubtitle}>Sample Audio</Text>
          
          <View style={styles.controlsContainer}>
            {/* Play button with icon and text label */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => playSound(
                sound1, 
                setSound1, 
                setIsPlaying1,
                require('./assets/sampleAudioForReactnative.m4a')
              )}
            >
              <Image
                source={require('./assets/play.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            
            {/* Pause button with icon and text label */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => pauseSound(sound1, isPlaying1, setIsPlaying1)}
            >
              <Image
                source={require('./assets/pause.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            
            {/* Stop button with icon and text label */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => stopSound(sound1, setSound1, setIsPlaying1)}
            >
              <Image
                source={require('./assets/stop.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
          
          {/* Status indicator for user feedback */}
          <Text style={styles.statusText}>
            Status: {isPlaying1 ? '▶️ Playing' : '⏸️ Stopped'}
          </Text>
        </View>

        {/* Divider between players */}
        <View style={styles.divider} />

        {/* Audio Player 2 Section */}
        <View style={styles.playerContainer}>
          <Text style={styles.playerTitle}>🎵 Audio Track 2</Text>
          <Text style={styles.playerSubtitle}>Alternative Audio</Text>
          
          <View style={styles.controlsContainer}>
            {/* Play button for second audio track */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => playSound(
                sound2, 
                setSound2, 
                setIsPlaying2,
                require('./assets/sampleAudioForReactnative.m4a')
              )}
            >
              <Image
                source={require('./assets/play.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            
            {/* Pause button for second audio track */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => pauseSound(sound2, isPlaying2, setIsPlaying2)}
            >
              <Image
                source={require('./assets/pause.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            
            {/* Stop button for second audio track */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => stopSound(sound2, setSound2, setIsPlaying2)}
            >
              <Image
                source={require('./assets/stop.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
          
          {/* Status indicator for second player */}
          <Text style={styles.statusText}>
            Status: {isPlaying2 ? '▶️ Playing' : '⏸️ Stopped'}
          </Text>
        </View>
        
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Main scrollable container for entire app
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Primary container holding all content
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
  // Main app title styling
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  // Subtitle text below main title
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  
  // Container for each audio player section
  // Provides visual separation and consistent spacing
  playerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Title for each audio player
  playerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  // Subtitle for each audio player
  playerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  // Horizontal container for control buttons
  // FlexDirection row places buttons side by side
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  // Individual button container
  // Centers icon and text vertically
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  
  // Icon image styling
  // Consistent size for all control icons
  buttonImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  
  // Text label below each button icon
  buttonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  
  // Visual separator between audio players
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  
  // Status text showing current playback state
  statusText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  }
});
