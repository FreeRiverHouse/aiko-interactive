import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const { width } = Dimensions.get('window');

interface SceneObject {
  id: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  visible: boolean;
  scanned: boolean;
}

interface Level {
  id: number;
  title: string;
  instruction: string;
  objects: SceneObject[];
}

const levels: Level[] = [
  {
    id: 1,
    title: 'Street Scene',
    instruction: 'Tap all objects the LiDAR can see!',
    objects: [
      { id: 'car1', emoji: '🚗', name: 'Car', x: 20, y: 30, visible: true, scanned: false },
      { id: 'person1', emoji: '🚶', name: 'Person', x: 50, y: 50, visible: true, scanned: false },
      { id: 'tree1', emoji: '🌳', name: 'Tree', x: 80, y: 35, visible: true, scanned: false },
      { id: 'dog1', emoji: '🐕', name: 'Dog', x: 35, y: 65, visible: true, scanned: false },
    ],
  },
  {
    id: 2,
    title: 'Busy Intersection',
    instruction: 'More objects! Scan them all!',
    objects: [
      { id: 'car2', emoji: '🚙', name: 'SUV', x: 15, y: 40, visible: true, scanned: false },
      { id: 'bike1', emoji: '🚴', name: 'Cyclist', x: 45, y: 25, visible: true, scanned: false },
      { id: 'bus1', emoji: '🚌', name: 'Bus', x: 75, y: 55, visible: true, scanned: false },
      { id: 'person2', emoji: '👨', name: 'Man', x: 60, y: 70, visible: true, scanned: false },
      { id: 'sign1', emoji: '🚦', name: 'Traffic Light', x: 25, y: 20, visible: true, scanned: false },
    ],
  },
  {
    id: 3,
    title: 'Night Drive',
    instruction: 'LiDAR works even at night!',
    objects: [
      { id: 'car3', emoji: '🚕', name: 'Taxi', x: 30, y: 35, visible: true, scanned: false },
      { id: 'cat1', emoji: '🐈', name: 'Cat', x: 70, y: 60, visible: true, scanned: false },
      { id: 'person3', emoji: '🧑', name: 'Pedestrian', x: 50, y: 45, visible: true, scanned: false },
      { id: 'truck1', emoji: '🚛', name: 'Truck', x: 20, y: 65, visible: true, scanned: false },
      { id: 'cone1', emoji: '🦺', name: 'Safety Cone', x: 80, y: 30, visible: true, scanned: false },
      { id: 'bench1', emoji: '🪑', name: 'Bench', x: 55, y: 75, visible: true, scanned: false },
    ],
  },
];

export default function LidarGame() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [score, setScore] = useState(0);
  const [scannedCount, setScannedCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Reset level
    setObjects(levels[currentLevel].objects.map((obj) => ({ ...obj, scanned: false })));
    setScannedCount(0);
  }, [currentLevel]);

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleObjectTap = (objectId: string) => {
    setObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === objectId && !obj.scanned) {
          setScore((s) => s + 10);
          setScannedCount((c) => {
            const newCount = c + 1;
            if (newCount === levels[currentLevel].objects.length) {
              // Level complete!
              setTimeout(() => {
                if (currentLevel < levels.length - 1) {
                  setShowComplete(true);
                } else {
                  // Game complete
                  setShowComplete(true);
                }
              }, 500);
            }
            return newCount;
          });
          return { ...obj, scanned: true };
        }
        return obj;
      })
    );
  };

  const handleNextLevel = () => {
    setShowComplete(false);
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentLevel(0);
    setScore(0);
    setShowComplete(false);
  };

  const level = levels[currentLevel];
  const isGameComplete = showComplete && currentLevel === levels.length - 1;

  // Level Complete / Game Complete Modal
  if (showComplete) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>
            {isGameComplete ? '🏆' : '✨'}
          </Text>
          <Text style={[styles.completeTitle, { color: colors.text }]}>
            {isGameComplete ? 'Amazing! Game Complete!' : 'Level Complete!'}
          </Text>
          <Text style={[styles.completeScore, { color: colors.primary }]}>
            Score: {score}
          </Text>

          {!isGameComplete ? (
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: colors.primary }]}
              onPress={handleNextLevel}
            >
              <Text style={styles.nextButtonText}>Next Level</Text>
              <FontAwesome name="arrow-right" size={18} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.finalButtons}>
              <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: colors.primary }]}
                onPress={handleRestart}
              >
                <FontAwesome name="refresh" size={18} color="#fff" />
                <Text style={styles.nextButtonText}>Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.backButton, { borderColor: colors.primary }]}
                onPress={() => router.push('/(tabs)/games')}
              >
                <Text style={[styles.backButtonText, { color: colors.primary }]}>
                  Back to Games
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreLabel, { color: colors.textLight }]}>Score</Text>
          <Text style={[styles.scoreValue, { color: colors.primary }]}>{score}</Text>
        </View>
      </View>

      {/* Level Info */}
      <View style={styles.levelInfo}>
        <Text style={[styles.levelTitle, { color: colors.text }]}>
          Level {level.id}: {level.title}
        </Text>
        <Text style={[styles.instruction, { color: colors.textLight }]}>
          {level.instruction}
        </Text>
        <Text style={[styles.progress, { color: colors.primary }]}>
          Found: {scannedCount} / {level.objects.length}
        </Text>
      </View>

      {/* Game Area */}
      <View style={[styles.gameArea, { backgroundColor: '#1a1a2e' }]}>
        {/* LiDAR Scanner Effect */}
        <Animated.View
          style={[
            styles.lidarScanner,
            {
              opacity: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Objects */}
        {objects.map((obj) => (
          <TouchableOpacity
            key={obj.id}
            style={[
              styles.object,
              {
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                backgroundColor: obj.scanned ? colors.lidarGreen + '30' : 'transparent',
                borderColor: obj.scanned ? colors.lidarGreen : 'transparent',
              },
            ]}
            onPress={() => handleObjectTap(obj.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.objectEmoji}>{obj.emoji}</Text>
            {obj.scanned && (
              <View style={[styles.scanBadge, { backgroundColor: colors.lidarGreen }]}>
                <FontAwesome name="check" size={10} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* LiDAR label */}
        <View style={styles.lidarLabel}>
          <Text style={styles.lidarLabelText}>LiDAR View</Text>
        </View>
      </View>

      {/* Educational Tip */}
      <View style={[styles.tipContainer, { backgroundColor: colors.primaryLight }]}>
        <Text style={styles.tipIcon}>💡</Text>
        <Text style={[styles.tipText, { color: colors.text }]}>
          Real LiDAR scans 60 times per second and can see everything around the car!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreLabel: {
    fontSize: 12,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  levelInfo: {
    padding: 16,
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 8,
  },
  progress: {
    fontSize: 16,
    fontWeight: '600',
  },
  gameArea: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  lidarScanner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    marginLeft: -100,
    marginTop: -100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#00ff88',
  },
  object: {
    position: 'absolute',
    width: 60,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 2,
  },
  objectEmoji: {
    fontSize: 36,
  },
  scanBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lidarLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,255,136,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  lidarLabelText: {
    color: '#00ff88',
    fontSize: 12,
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  // Complete screen styles
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  completeEmoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  completeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  completeScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalButtons: {
    gap: 16,
  },
  backButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
