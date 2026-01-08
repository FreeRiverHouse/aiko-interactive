import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import quizzes from '@/data/quizzes.json';

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapterId = parseInt(id || '1');
  const quiz = quizzes.quizzes.find(q => q.chapterId === chapterId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <Text>Quiz not found</Text>
      </View>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const totalQuestions = quiz.questions.length;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const getStars = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  if (quizComplete) {
    const stars = getStars();
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3].map(i => (
              <Text key={i} style={[styles.star, i <= stars && styles.starActive]}>
                *
              </Text>
            ))}
          </View>

          <Text style={styles.scoreText}>
            You got {score} out of {totalQuestions} correct!
          </Text>

          {stars === 3 && (
            <Text style={styles.congratsText}>Amazing! You're an AI expert!</Text>
          )}
          {stars === 2 && (
            <Text style={styles.congratsText}>Great job! Keep learning!</Text>
          )}
          {stars === 1 && (
            <Text style={styles.congratsText}>Good try! Read the chapter again!</Text>
          )}
          {stars === 0 && (
            <Text style={styles.congratsText}>Keep trying! You can do it!</Text>
          )}

          <TouchableOpacity
            style={styles.nextChapterButton}
            onPress={() => {
              if (chapterId < 8) {
                router.push(`/chapter/${chapterId + 1}`);
              } else {
                router.push('/');
              }
            }}
          >
            <Text style={styles.nextChapterButtonText}>
              {chapterId < 8 ? 'Next Chapter' : 'Back to Home'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setQuizComplete(false);
            }}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }]} />
      </View>

      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {totalQuestions}
        </Text>
        <Text style={styles.chapterLabel}>Chapter {chapterId}</Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          let optionStyle = styles.option;
          let textStyle = styles.optionText;

          if (showResult) {
            if (index === question.correctIndex) {
              optionStyle = { ...styles.option, ...styles.optionCorrect };
              textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
            } else if (index === selectedAnswer && !isCorrect) {
              optionStyle = { ...styles.option, ...styles.optionWrong };
              textStyle = { ...styles.optionText, ...styles.optionTextWrong };
            }
          } else if (index === selectedAnswer) {
            optionStyle = { ...styles.option, ...styles.optionSelected };
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswer(index)}
              disabled={showResult}
            >
              <Text style={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={textStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showResult && (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackTitle, isCorrect ? styles.correctText : styles.wrongText]}>
            {isCorrect ? 'Correct!' : 'Not quite!'}
          </Text>
          <Text style={styles.feedbackExplanation}>{question.explanation}</Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f5',
  },
  content: {
    paddingBottom: 40,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d4af37',
    borderRadius: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5d6d7e',
  },
  chapterLabel: {
    fontSize: 14,
    color: '#d4af37',
    fontWeight: '600',
  },
  questionCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionSelected: {
    borderColor: '#d4af37',
    backgroundColor: '#fef9e7',
  },
  optionCorrect: {
    borderColor: '#27ae60',
    backgroundColor: '#e8f8f0',
  },
  optionWrong: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdedec',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: '700',
    color: '#5d6d7e',
    marginRight: 12,
    overflow: 'hidden',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#34495e',
  },
  optionTextCorrect: {
    color: '#27ae60',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#e74c3c',
  },
  feedbackContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctText: {
    color: '#27ae60',
  },
  wrongText: {
    color: '#e74c3c',
  },
  feedbackExplanation: {
    fontSize: 16,
    color: '#5d6d7e',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#faf8f5',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  star: {
    fontSize: 48,
    color: '#e0e0e0',
    marginHorizontal: 8,
  },
  starActive: {
    color: '#d4af37',
  },
  scoreText: {
    fontSize: 20,
    color: '#5d6d7e',
    marginBottom: 16,
  },
  congratsText: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  nextChapterButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 16,
  },
  nextChapterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#5d6d7e',
    fontSize: 16,
    fontWeight: '600',
  },
});
