import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface GameCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  available: boolean;
}

const games: GameCard[] = [
  {
    id: 'lidar',
    title: "What Does LiDAR See?",
    description: "Discover how the robotaxi 'sees' the world using laser beams! Tap objects to scan them.",
    icon: '👁️',
    available: true,
  },
  {
    id: 'sensors',
    title: 'Find the Sensors',
    description: 'Can you find all 8 cameras and the LiDAR on the robotaxi? Touch to discover!',
    icon: '🔍',
    available: false,
  },
  {
    id: 'predict',
    title: 'Predict the Movement',
    description: 'Think like AI! Where will the cyclist go? Choose the correct path.',
    icon: '🎯',
    available: false,
  },
];

export default function GamesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.header, { color: colors.text }]}>
        Learn by Playing!
      </Text>
      <Text style={[styles.subheader, { color: colors.textLight }]}>
        Fun games that teach you how robotaxis work
      </Text>

      {games.map((game) => (
        <Link
          key={game.id}
          href={game.available ? `/games/${game.id}` : '#'}
          asChild
          disabled={!game.available}
        >
          <TouchableOpacity
            style={[
              styles.gameCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: game.available ? colors.primary : colors.cardBorder,
                opacity: game.available ? 1 : 0.6,
              },
            ]}
            activeOpacity={game.available ? 0.7 : 1}
          >
            <View style={styles.gameIcon}>
              <Text style={styles.iconText}>{game.icon}</Text>
            </View>
            <View style={styles.gameContent}>
              <View style={styles.titleRow}>
                <Text style={[styles.gameTitle, { color: colors.text }]}>
                  {game.title}
                </Text>
                {!game.available && (
                  <View style={[styles.comingSoonBadge, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.comingSoonText, { color: colors.primary }]}>
                      Coming Soon
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[styles.gameDescription, { color: colors.textLight }]}>
                {game.description}
              </Text>
              {game.available && (
                <View style={[styles.playButton, { backgroundColor: colors.primary }]}>
                  <Text style={styles.playButtonText}>PLAY</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Link>
      ))}

      {/* Educational tip */}
      <View style={[styles.tipCard, { backgroundColor: colors.primaryLight }]}>
        <Text style={styles.tipIcon}>💡</Text>
        <Text style={[styles.tipText, { color: colors.text }]}>
          These games help you understand the same technology used in real robotaxis!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    marginBottom: 24,
  },
  gameCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    marginBottom: 16,
  },
  gameIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 28,
  },
  gameContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  comingSoonBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  gameDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  playButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
