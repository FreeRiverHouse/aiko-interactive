import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

// I 6 capitoli del Salmo 23
const chapters = [
  {
    id: 0,
    title: 'Il Salmo 23 per Bambini',
    subtitle: 'Una storia di amore e protezione',
    text: '',
    image: require('./assets/images/00-copertina.jpg'),
    color: '#2d5a27',
  },
  {
    id: 1,
    title: 'Il Signore è il mio pastore',
    text: `C'era una volta un pastore buono, il più buono del mondo.
Aveva occhi gentili come il miele
e un sorriso che scaldava come il sole.

"Io sarò sempre con te," sussurrava il pastore,
"Non ti mancherà mai niente,
perché io mi prendo cura di te."

E le sue pecorelle, bianche come nuvole,
lo seguivano felici dovunque andasse.`,
    image: require('./assets/images/01-pastore.jpg'),
    color: '#3d7a37',
  },
  {
    id: 2,
    title: 'I pascoli e le acque tranquille',
    text: `Il pastore conosceva i posti più belli:
prati verdi dove l'erba era morbida,
ruscelli che cantavano canzoni d'argento.

"Riposa qui," diceva il pastore,
"L'acqua fresca ti darà forza,
e l'erba verde ti farà crescere."

Le pecorelle si sdraiavano contente,
e il mondo sembrava un abbraccio grande.`,
    image: require('./assets/images/02-acque-tranquille.jpg'),
    color: '#1e6091',
  },
  {
    id: 3,
    title: 'I sentieri giusti',
    text: `A volte la strada sembrava difficile,
piena di sassi e curve misteriose.

Ma il pastore camminava davanti:
"Seguimi," diceva con voce sicura,
"Io conosco la via giusta.
Ti porto dove c'è la luce."

E le pecorelle camminavano tranquille,
perché sapevano di essere al sicuro.`,
    image: require('./assets/images/03-sentieri.jpg'),
    color: '#8b5a2b',
  },
  {
    id: 4,
    title: 'La valle oscura',
    text: `Un giorno arrivò una valle buia,
dove le ombre sembravano giganti
e il vento faceva paura.

Ma il pastore strinse forte il suo bastone:
"Non temere," disse piano,
"Io sono qui, proprio accanto a te.
Il buio non ti può far male
quando camminiamo insieme."

E le pecorelle sentirono il cuore calmo,
perché il pastore era vicino.`,
    image: require('./assets/images/04-valle-oscura.jpg'),
    color: '#2c3e50',
  },
  {
    id: 5,
    title: 'La tavola e la coppa',
    text: `Poi arrivò un giorno di festa!
Il pastore preparò una tavola bellissima
piena di frutti colorati,
pane dorato e miele dolce.

"Questa è per te," disse sorridendo,
"Perché tu sei speciale.
La tua coppa è così piena
che trabocca di gioia!"

E le pecorelle mangiarono felici,
sentendosi le più amate del mondo.`,
    image: require('./assets/images/05-tavola.jpg'),
    color: '#c0392b',
  },
  {
    id: 6,
    title: 'La casa del Signore',
    text: `E così, giorno dopo giorno,
il pastore guidava le sue pecorelle
verso casa - una casa bellissima
fatta di luce e amore.

"Questa è la tua casa," disse il pastore,
"E io sarò sempre qui.
Oggi, domani e per sempre,
la bontà e l'amore ti seguiranno."

E le pecorelle capirono
che con il loro pastore,
sarebbero state felici per sempre.`,
    image: require('./assets/images/06-casa-signore.jpg'),
    color: '#f39c12',
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const chapter = chapters[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === chapters.length - 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: chapter.color }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>

        {/* Image */}
        <Image source={chapter.image} style={styles.image} resizeMode="cover" />

        {/* Title */}
        <Text style={styles.chapterNumber}>
          {currentIndex === 0 ? '' : `Capitolo ${currentIndex}`}
        </Text>
        <Text style={styles.title}>{chapter.title}</Text>
        {chapter.subtitle && <Text style={styles.subtitle}>{chapter.subtitle}</Text>}

        {/* Text */}
        {chapter.text ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>{chapter.text}</Text>
          </View>
        ) : (
          <View style={styles.coverInfo}>
            <Text style={styles.coverAuthor}>Testi: Gianni Parola</Text>
            <Text style={styles.coverAuthor}>Illustrazioni: Grok AI</Text>
            <Text style={styles.coverPublisher}>Onde</Text>
          </View>
        )}

        {/* Navigation */}
        <View style={styles.navigation}>
          {!isFirst && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setCurrentIndex(currentIndex - 1)}
            >
              <Text style={styles.navText}>← Indietro</Text>
            </TouchableOpacity>
          )}
          <View style={styles.dots}>
            {chapters.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setCurrentIndex(i)}>
                <View
                  style={[
                    styles.dot,
                    i === currentIndex && styles.dotActive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {!isLast && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setCurrentIndex(currentIndex + 1)}
            >
              <Text style={styles.navText}>Avanti →</Text>
            </TouchableOpacity>
          )}
        </View>

        {isLast && (
          <View style={styles.endSection}>
            <Text style={styles.endText}>Fine</Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => setCurrentIndex(0)}
            >
              <Text style={styles.restartText}>Ricomincia</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: width - 40,
    height: 280,
    borderRadius: 16,
    marginBottom: 20,
  },
  chapterNumber: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
    marginTop: 8,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
  },
  text: {
    fontSize: 18,
    lineHeight: 30,
    color: '#fff',
  },
  coverInfo: {
    marginTop: 40,
    alignItems: 'center',
  },
  coverAuthor: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  coverPublisher: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    letterSpacing: 4,
    textTransform: 'uppercase',
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  navButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  endSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  endText: {
    fontSize: 24,
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  restartText: {
    color: '#2d5a27',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
