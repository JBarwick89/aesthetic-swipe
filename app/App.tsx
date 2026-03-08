import { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const API_URL = 'http://localhost:3000'

const { width, height } = Dimensions.get('window')

interface Artwork {
  id: string
  title: string
  artist: string
  date: string
  imageUrl?: string
}

export default function App() {
  const [artwork, setArtwork] = useState<Artwork | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/artwork/random`)
      .then(r => r.json())
      .then((data) => {
        setArtwork(data)
        setLoading(false)
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.appTitle}>AESTHETIC SWIPE</Text>

      <View style={styles.content}>
        {loading || !artwork
          ? <ActivityIndicator size="large" color="#ff00cc" />
          : (
              <View style={styles.card}>
                {artwork.imageUrl
                  ? (
                      <Image
                        source={{ uri: artwork.imageUrl }}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    )
                  : <View style={styles.imagePlaceholder} />}

                <View style={styles.cardFooter}>
                  <Text style={styles.title} numberOfLines={2}>{artwork.title}</Text>
                  <Text style={styles.artist} numberOfLines={1}>{artwork.artist}</Text>
                </View>
              </View>
            )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },

  appTitle: {
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 8,
    color: '#ff00cc',
    textShadowColor: '#ff00cc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    textAlign: 'center',
    paddingVertical: 16,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  card: {
    width: width - 48,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#16161f',
    borderWidth: 1,
    borderColor: '#2a2a3a',
  },

  image: {
    width: '100%',
    height: height * 0.55,
    backgroundColor: '#1e1e2e',
  },

  imagePlaceholder: {
    width: '100%',
    height: height * 0.55,
    backgroundColor: '#1e1e2e',
  },

  cardFooter: {
    padding: 20,
    gap: 6,
  },

  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  artist: {
    color: '#888',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
})
