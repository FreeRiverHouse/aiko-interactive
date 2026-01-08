import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import chapters from '@/data/chapters.json';

const { width } = Dimensions.get('window');

export default function ChapterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const chapterId = parseInt(id || '1', 10);
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Chapter not found
        </Text>
      </View>
    );
  }

  const hasPrevious = chapterId > 1;
  const hasNext = chapterId < chapters.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Chapter Image Placeholder */}
        <View style={[styles.imageContainer, { backgroundColor: colors.primaryLight }]}>
          <Text style={styles.imageEmoji}>
            {chapterId === 1 && '🚗'}
            {chapterId === 2 && '👁️'}
            {chapterId === 3 && '🧠'}
            {chapterId === 4 && '📊'}
            {chapterId === 5 && '🛡️'}
            {chapterId === 6 && '👥'}
            {chapterId === 7 && '🌟'}
            {chapterId === 8 && '🏠'}
          </Text>
        </View>

        {/* Chapter Header */}
        <View style={styles.header}>
          <Text style={[styles.chapterLabel, { color: colors.primary }]}>
            Chapter {chapter.id}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {chapter.title}
          </Text>
        </View>

        {/* Story Content */}
        <View style={styles.storyContainer}>
          <Text style={[styles.storyText, { color: colors.text }]}>
            {chapter.content}
          </Text>
        </View>

        {/* Key Points */}
        <View style={[styles.keyPointsCard, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.keyPointsTitle, { color: colors.text }]}>
            💡 Key Points
          </Text>
          {chapter.keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPointRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.keyPointText, { color: colors.text }]}>
                {point}
              </Text>
            </View>
          ))}
        </View>

        {/* Quiz Button */}
        <Link href={`/quiz/${chapter.id}`} asChild>
          <TouchableOpacity
            style={[styles.quizButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <FontAwesome name="question-circle" size={20} color="#fff" />
            <Text style={styles.quizButtonText}>Take the Quiz!</Text>
          </TouchableOpacity>
        </Link>

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              { borderColor: colors.cardBorder },
              !hasPrevious && styles.navButtonDisabled,
            ]}
            onPress={() => hasPrevious && router.push(`/chapter/${chapterId - 1}`)}
            disabled={!hasPrevious}
          >
            <FontAwesome
              name="chevron-left"
              size={16}
              color={hasPrevious ? colors.text : colors.cardBorder}
            />
            <Text
              style={[
                styles.navButtonText,
                { color: hasPrevious ? colors.text : colors.cardBorder },
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>

          <Text style={[styles.pageIndicator, { color: colors.textLight }]}>
            {chapterId} / {chapters.length}
          </Text>

          <TouchableOpacity
            style={[
              styles.navButton,
              { borderColor: colors.cardBorder },
              !hasNext && styles.navButtonDisabled,
            ]}
            onPress={() => hasNext && router.push(`/chapter/${chapterId + 1}`)}
            disabled={!hasNext}
          >
            <Text
              style={[
                styles.navButtonText,
                { color: hasNext ? colors.text : colors.cardBorder },
              ]}
            >
              Next
            </Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color={hasNext ? colors.text : colors.cardBorder}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  imageContainer: {
    width: width - 32,
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageEmoji: {
    fontSize: 72,
  },
  header: {
    marginBottom: 20,
  },
  chapterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  storyContainer: {
    marginBottom: 24,
  },
  storyText: {
    fontSize: 17,
    lineHeight: 28,
  },
  keyPointsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  keyPointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  keyPointRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  keyPointText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 6,
  },
  pageIndicator: {
    fontSize: 14,
  },
});
