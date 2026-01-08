import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [mood, setMood] = useState('happy');
  const [coins, setCoins] = useState(100);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Moonlight</Text>
        <Text style={styles.coins}>Coins: {coins}</Text>
      </View>

      {/* Casa */}
      <View style={styles.house}>
        <Text style={styles.houseEmoji}>🏠</Text>
        <Text style={styles.houseName}>Casa di Moonlight</Text>
      </View>

      {/* Personaggio */}
      <View style={styles.character}>
        <Text style={styles.characterEmoji}>
          {mood === 'happy' ? '😊' : mood === 'hungry' ? '😋' : '😴'}
        </Text>
        <Text style={styles.characterName}>Moonlight</Text>
        <Text style={styles.mood}>Mood: {mood}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => setMood('happy')}>
          <Text style={styles.buttonText}>🍕 Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMood('happy')}>
          <Text style={styles.buttonText}>🎮 Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMood('happy')}>
          <Text style={styles.buttonText}>👕 Dress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMood('happy')}>
          <Text style={styles.buttonText}>🛋️ Decorate</Text>
        </TouchableOpacity>
      </View>

      {/* Status */}
      <View style={styles.status}>
        <View style={styles.statusBar}>
          <Text>❤️ Health</Text>
          <View style={styles.bar}><View style={[styles.barFill, {width: '80%'}]} /></View>
        </View>
        <View style={styles.statusBar}>
          <Text>🍔 Hunger</Text>
          <View style={styles.bar}><View style={[styles.barFill, {width: '60%', backgroundColor: '#f59e0b'}]} /></View>
        </View>
        <View style={styles.statusBar}>
          <Text>😴 Energy</Text>
          <View style={styles.bar}><View style={[styles.barFill, {width: '90%', backgroundColor: '#10b981'}]} /></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  coins: {
    fontSize: 18,
    color: '#ffd700',
  },
  house: {
    backgroundColor: '#2d2d44',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  houseEmoji: {
    fontSize: 60,
  },
  houseName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  character: {
    alignItems: 'center',
    marginBottom: 30,
  },
  characterEmoji: {
    fontSize: 100,
  },
  characterName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  mood: {
    color: '#888',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    backgroundColor: '#2d2d44',
    borderRadius: 15,
    padding: 15,
  },
  statusBar: {
    marginBottom: 10,
  },
  bar: {
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginTop: 5,
  },
  barFill: {
    height: 10,
    backgroundColor: '#ef4444',
    borderRadius: 5,
  },
});
