import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import chapters from '@/data/chapters.json';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Cover Section */}
      <View style={styles.coverSection}>
        <View style={[styles.coverImage, { backgroundColor: colors.primaryLight }]}>
          <Text style={styles.coverEmoji}>🚗</Text>
          <Text style={[styles.coverTitle, { color: colors.text }]}>
            AIKO 2
          </Text>
          <Text style={[styles.coverSubtitle, { color: colors.textLight }]}>
            The Robotaxi Adventure
          </Text>
        </View>
        <Text style={[styles.tagline, { color: colors.textLight }]}>
          Learn how self-driving cars work!
        </Text>
      </View>

      {/* Chapters Grid */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Chapters
      </Text>

      <View style={styles.grid}>
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapter/${chapter.id}`}
            asChild
          >
            <TouchableOpacity
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder,
                },
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.cardImage, { backgroundColor: colors.primaryLight }]}>
                <Text style={styles.chapterNumber}>{chapter.id}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text
                  style={[styles.cardTitle, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {chapter.title}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      {/* Bottom spacer */}
      <View style={styles.bottomSpacer} />
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
  coverSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  coverImage: {
    width: width - 32,
    height: 180,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  coverEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  coverSubtitle: {
    fontSize: 18,
    marginTop: 4,
  },
  tagline: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 20,
  },
});
