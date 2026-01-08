import { StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, Link, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import chapters from '@/data/chapters.json';

const { width } = Dimensions.get('window');

export default function ChapterScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapterId = parseInt(id || '1');
  const chapter = chapters.chapters.find(c => c.id === chapterId);

  if (!chapter) {
    return (
      <View style={styles.container}>
        <Text>Chapter not found</Text>
      </View>
    );
  }

  const hasNext = chapterId < 8;
  const hasPrev = chapterId > 1;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={getChapterImage(chapterId)}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <View style={styles.chapterHeader}>
        <Text style={styles.chapterLabel}>Chapter {chapter.id}</Text>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
      </View>

      <View style={styles.storyContent}>
        <Text style={styles.storyText}>{chapter.content}</Text>
      </View>

      <View style={styles.keyPointsSection}>
        <Text style={styles.keyPointsTitle}>Key Points</Text>
        {chapter.keyPoints.map((point, index) => (
          <View key={index} style={styles.keyPoint}>
            <Text style={styles.keyPointBullet}>*</Text>
            <Text style={styles.keyPointText}>{point}</Text>
          </View>
        ))}
      </View>

      <Link href={`/quiz/${chapterId}`} asChild>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.quizButtonText}>Take the Quiz!</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.navigation}>
        {hasPrev && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push(`/chapter/${chapterId - 1}`)}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }} />
        {hasNext && (
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonNext]}
            onPress={() => router.push(`/chapter/${chapterId + 1}`)}
          >
            <Text style={[styles.navButtonText, styles.navButtonTextNext]}>Next Chapter</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

function getChapterImage(id: number) {
  const images: { [key: number]: any } = {
    1: require('@/assets/images/chapters/chapter-01.jpg'),
    2: require('@/assets/images/chapters/chapter-02.jpg'),
    3: require('@/assets/images/chapters/chapter-03.jpg'),
    4: require('@/assets/images/chapters/chapter-04.jpg'),
    5: require('@/assets/images/chapters/chapter-05.jpg'),
    6: require('@/assets/images/chapters/chapter-06.jpg'),
    7: require('@/assets/images/chapters/chapter-07.jpg'),
    8: require('@/assets/images/chapters/chapter-08.jpg'),
  };
  return images[id];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  content: {
    paddingBottom: 40,
  },
  headerImage: {
    width: width,
    height: width * 0.65,
  },
  chapterHeader: {
    padding: 20,
    backgroundColor: '#faf8f5',
  },
  chapterLabel: {
    fontSize: 14,
    color: '#d4af37',
    fontWeight: '600',
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  storyContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#34495e',
    fontFamily: 'Georgia',
  },
  keyPointsSection: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  keyPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  keyPointBullet: {
    color: '#d4af37',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  keyPointText: {
    flex: 1,
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
  },
  quizButton: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#d4af37',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: 'transparent',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  navButtonNext: {
    backgroundColor: '#2c3e50',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5d6d7e',
  },
  navButtonTextNext: {
    color: '#fff',
  },
});
