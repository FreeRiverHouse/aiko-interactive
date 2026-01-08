import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import quizzes from '@/data/quizzes.json';
import chapters from '@/data/chapters.json';

const { width } = Dimensions.get('window');

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const chapterId = parseInt(id || '1', 10);
  const quiz = quizzes.find((q) => q.chapterId === chapterId);
  const chapter = chapters.find((c) => c.id === chapterId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!quiz || !chapter) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Quiz not found
        </Text>
      </View>
    );
  }

  const questions: Question[] = quiz.questions;
  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  const getStars = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 60) return 2;
    if (percentage >= 30) return 1;
    return 0;
  };

  // Results Screen
  if (isComplete) {
    const stars = getStars();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.resultsContent}>
          <Text style={styles.resultsEmoji}>
            {stars === 3 ? '🌟' : stars === 2 ? '⭐' : stars === 1 ? '✨' : '📚'}
          </Text>
          <Text style={[styles.resultsTitle, { color: colors.text }]}>
            {stars === 3 ? 'Perfect!' : stars >= 2 ? 'Great job!' : 'Keep learning!'}
          </Text>
          <Text style={[styles.resultsScore, { color: colors.textLight }]}>
            You got {score} out of {totalQuestions} correct
          </Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3].map((star) => (
              <FontAwesome
                key={star}
                name="star"
                size={40}
                color={star <= stars ? colors.primary : colors.cardBorder}
                style={styles.star}
              />
            ))}
          </View>

          <View style={styles.resultsButtons}>
            <TouchableOpacity
              style={[styles.resultButton, { backgroundColor: colors.primary }]}
              onPress={handleRestart}
            >
              <FontAwesome name="refresh" size={18} color="#fff" />
              <Text style={styles.resultButtonText}>Try Again</Text>
            </TouchableOpacity>

            {chapterId < chapters.length && (
              <TouchableOpacity
                style={[styles.resultButton, { backgroundColor: colors.correct }]}
                onPress={() => router.push(`/chapter/${chapterId + 1}`)}
              >
                <Text style={styles.resultButtonText}>Next Chapter</Text>
                <FontAwesome name="arrow-right" size={18} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.push('/')}
          >
            <Text style={[styles.backLinkText, { color: colors.textLight }]}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Quiz Screen
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress Bar */}
        <View style={[styles.progressBar, { backgroundColor: colors.cardBorder }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.primary, width: `${progress}%` },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textLight }]}>
          Question {currentQuestion + 1} of {totalQuestions}
        </Text>

        {/* Question */}
        <View style={[styles.questionCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.questionText, { color: colors.text }]}>
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = selectedAnswer !== null;

            let backgroundColor = colors.cardBackground;
            let borderColor = colors.cardBorder;

            if (showResult) {
              if (isCorrect) {
                backgroundColor = colors.correct + '20';
                borderColor = colors.correct;
              } else if (isSelected && !isCorrect) {
                backgroundColor = colors.wrong + '20';
                borderColor = colors.wrong;
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { backgroundColor, borderColor },
                ]}
                onPress={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                activeOpacity={0.7}
              >
                <View style={[styles.optionLetter, { borderColor }]}>
                  <Text style={[styles.optionLetterText, { color: colors.text }]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>
                  {option}
                </Text>
                {showResult && isCorrect && (
                  <FontAwesome name="check" size={20} color={colors.correct} />
                )}
                {showResult && isSelected && !isCorrect && (
                  <FontAwesome name="times" size={20} color={colors.wrong} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View
            style={[
              styles.explanationCard,
              {
                backgroundColor:
                  selectedAnswer === question.correctAnswer
                    ? colors.correct + '15'
                    : colors.wrong + '15',
              },
            ]}
          >
            <Text
              style={[
                styles.explanationTitle,
                {
                  color:
                    selectedAnswer === question.correctAnswer
                      ? colors.correct
                      : colors.wrong,
                },
              ]}
            >
              {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Not quite'}
            </Text>
            <Text style={[styles.explanationText, { color: colors.text }]}>
              {question.explanation}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {showExplanation && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: colors.primary }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            </Text>
            <FontAwesome name="arrow-right" size={18} color="#fff" />
          </TouchableOpacity>
        )}
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
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  explanationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  // Results styles
  resultsContent: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 500,
  },
  resultsEmoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultsScore: {
    fontSize: 18,
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  star: {
    marginHorizontal: 8,
  },
  resultsButtons: {
    width: '100%',
    gap: 12,
  },
  resultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  resultButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: 24,
  },
  backLinkText: {
    fontSize: 16,
  },
});
