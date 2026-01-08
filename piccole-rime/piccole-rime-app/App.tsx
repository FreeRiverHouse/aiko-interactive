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

// Le 5 poesie verificate
const poems = [
  {
    id: 1,
    title: 'Stella Stellina',
    author: 'Lina Schwarz (1876-1947)',
    text: `Stella stellina
la notte s'avvicina:
la fiamma traballa,
la mucca è nella stalla.

La mucca e il vitello,
la pecora e l'agnello,
la chioccia e il pulcino,
la mamma e il suo bambino.

Ognuno ha il suo piccino,
ognuno ha la sua mamma
e tutti fan la nanna.`,
    image: require('./assets/images/01-stella-stellina.jpg'),
    color: '#1a1a2e',
  },
  {
    id: 2,
    title: 'Che dice la pioggerellina',
    author: 'A.S. Novaro (1866-1938)',
    text: `Che dice la pioggerellina
di marzo, che picchia argentina
sui tegoli vecchi del tetto,
sui bruscoli secchi dell'orto?

Passata è l'uggiosa invernata,
passata, passata!
Domani uscirà Primavera
con pieno il grembiale
di tiepido sole,
di fresche viole...

Ciò canta, ciò dice;
e il cuor che l'ascolta è felice.`,
    image: require('./assets/images/03-pioggerellina.jpg'),
    color: '#16213e',
  },
  {
    id: 3,
    title: 'La Befana',
    author: 'Guido Gozzano (1883-1916)',
    text: `Discesi dal lettino
son là presso il camino,
grandi occhi estasiati,
i bimbi affaccendati

a metter la scarpetta
che invita la Vecchietta
a portar chicche e doni
per tutti i bimbi buoni.

Ognun chiudendo gli occhi,
sogna dolci e balocchi;
e Dori, il più piccino,
accosta il suo visino

alla grande vetrata
per veder la sfilata
dei Magi, su nel cielo,
nella notte di gelo.`,
    image: require('./assets/images/05-la-befana.jpg'),
    color: '#0f3460',
  },
  {
    id: 4,
    title: 'La Lumachella',
    author: 'Trilussa (1871-1950)',
    text: `'Na lumachella de la vanagloria
ch'era strisciata sopra un obelisco
guardò la bava e disse:
– Loss'che risco!
Ho lasciato la traccia ne la storia!`,
    note: 'Quartina in romanesco',
    image: null,
    color: '#533483',
  },
  {
    id: 5,
    title: "L'Uguaglianza",
    author: 'Trilussa (1871-1950)',
    text: `Un Gallo ebbe a che dire con un'Aquila.
– Semo pari – diceva – in tutto:
io fo' chicchirichì, tu fai crucru...

– Io volo sur cielo e tu raspi in terra!

– Ho capito – arispone er Gallo –
tu sei nata pe' l'aria, io pe' er pollaio.
Ma quann'è che me fai vedere er volo?`,
    note: 'Favola in romanesco',
    image: null,
    color: '#e94560',
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const renderHome = () => (
    <ScrollView style={styles.homeContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Piccole Rime</Text>
        <Text style={styles.subtitle}>Antologia di Poesia Italiana</Text>
        <Text style={styles.publisher}>Onde</Text>
      </View>

      <View style={styles.poemList}>
        {poems.map((poem, index) => (
          <TouchableOpacity
            key={poem.id}
            style={[styles.poemCard, { backgroundColor: poem.color }]}
            onPress={() => setCurrentIndex(index)}
          >
            <Text style={styles.poemNumber}>{index + 1}</Text>
            <View style={styles.poemInfo}>
              <Text style={styles.poemTitle}>{poem.title}</Text>
              <Text style={styles.poemAuthor}>{poem.author}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>5 poesie della tradizione italiana</Text>
    </ScrollView>
  );

  const renderPoem = () => {
    const poem = poems[currentIndex];
    return (
      <ScrollView style={[styles.poemContainer, { backgroundColor: poem.color }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentIndex(-1)}>
          <Text style={styles.backText}>← Indietro</Text>
        </TouchableOpacity>

        <Text style={styles.poemPageTitle}>{poem.title}</Text>
        <Text style={styles.poemPageAuthor}>{poem.author}</Text>

        {poem.image && (
          <Image source={poem.image} style={styles.poemImage} resizeMode="cover" />
        )}

        <View style={styles.poemTextContainer}>
          <Text style={styles.poemText}>{poem.text}</Text>
          {poem.note && <Text style={styles.poemNote}>{poem.note}</Text>}
        </View>

        <View style={styles.navigation}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setCurrentIndex(currentIndex - 1)}
            >
              <Text style={styles.navText}>← Precedente</Text>
            </TouchableOpacity>
          )}
          {currentIndex < poems.length - 1 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setCurrentIndex(currentIndex + 1)}
            >
              <Text style={styles.navText}>Successiva →</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {currentIndex === -1 ? renderHome() : renderPoem()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  homeContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f9d923',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4ecca3',
    fontStyle: 'italic',
    marginTop: 8,
  },
  publisher: {
    fontSize: 16,
    color: '#f9d923',
    marginTop: 20,
    letterSpacing: 4,
    textTransform: 'uppercase',
    borderWidth: 1,
    borderColor: '#f9d923',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  poemList: {
    gap: 12,
  },
  poemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  poemNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9d923',
    width: 40,
  },
  poemInfo: {
    flex: 1,
  },
  poemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  poemAuthor: {
    fontSize: 14,
    color: '#4ecca3',
    marginTop: 4,
  },
  arrow: {
    fontSize: 24,
    color: '#f9d923',
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    marginBottom: 40,
    fontStyle: 'italic',
  },
  poemContainer: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: '#f9d923',
    fontSize: 16,
  },
  poemPageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f9d923',
    textAlign: 'center',
  },
  poemPageAuthor: {
    fontSize: 16,
    color: '#4ecca3',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 20,
  },
  poemImage: {
    width: width - 40,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  poemTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    borderRadius: 12,
  },
  poemText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#fff',
  },
  poemNote: {
    fontSize: 14,
    color: '#4ecca3',
    fontStyle: 'italic',
    marginTop: 16,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 40,
  },
  navButton: {
    backgroundColor: 'rgba(249, 217, 35, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f9d923',
  },
  navText: {
    color: '#f9d923',
    fontSize: 16,
  },
});
