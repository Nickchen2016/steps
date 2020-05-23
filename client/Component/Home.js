import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function Home({ navigation }) {

    let [fontsLoaded] = useFonts({
        'AvenirNextHeavyItalic': require('../../assets/fonts/AvenirNextHeavyItalic.ttf'),
        'AvenirNextULtltalic': require('../../assets/fonts/AvenirNextULtltalic.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        setTimeout(() => {
            navigation.navigate('Chart')
        }, 3000)
        return (
            <View style={styles.container} >
                <Text style={[styles.logoFont,{fontFamily: 'AvenirNextHeavyItalic'}]}>Steps.</Text>
                <Text style={[styles.subFont,{fontFamily: 'AvenirNextULtltalic'}]}>Step out of your comfort zoom</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFont: {
    fontSize: 90,
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  subFont: {
    marginTop:-6, marginLeft:-15,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: 'black'
  }
});