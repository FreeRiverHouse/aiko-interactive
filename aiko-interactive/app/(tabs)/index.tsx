import { StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import chapters from '@/data/chapters.json';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/chapters/00-cover.jpg')}
          style={styles.coverImage}
        />
        <Text style={styles.title}>AIKO</Text>
        <Text style={styles.subtitle}>AI Explained to Children</Text>
      </View>

      <Text style={styles.sectionTitle}>Chapters</Text>

      <View style={styles.chaptersGrid}>
        {chapters.chapters.map((chapter, index) => (
          <Link
            key={chapter.id}
            href={`/chapter/${chapter.id}`}
            asChild
          >
            <TouchableOpacity style={styles.chapterCard}>
              <Image
                source={getChapterImage(chapter.id)}
                style={styles.chapterImage}
              />
              <View style={styles.chapterInfo}>
                <Text style={styles.chapterNumber}>Chapter {chapter.id}</Text>
                <Text style={styles.chapterTitle} numberOfLines={2}>
                  {chapter.title}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Published by Onde, Free River House
        </Text>
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
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: '#faf8f5',
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#5d6d7e',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chaptersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
    backgroundColor: 'transparent',
  },
  chapterCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chapterImage: {
    width: '100%',
    height: cardWidth * 0.7,
  },
  chapterInfo: {
    padding: 12,
    backgroundColor: '#fff',
  },
  chapterNumber: {
    fontSize: 12,
    color: '#d4af37',
    fontWeight: '600',
    marginBottom: 4,
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});
