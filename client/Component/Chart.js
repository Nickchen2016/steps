import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useStepCounter } from './stepCounter';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import ColumnChart from './ColumnChart';
import Slide from './Slide';
import CircularChart from './CircularChart';


export default function Home() {
    const currentStepCount = useStepCounter().currentStepCount;
    const pastStepCount = useStepCounter().pastStepCount;
    const isPedometerAvailable = useStepCounter().isPedometerAvailable;

    let [fontsLoaded] = useFonts({
        'AvenirNextHeavyItalic': require('../../assets/fonts/AvenirNextHeavyItalic.ttf'),
        'AvenirNextULtltalic': require('../../assets/fonts/AvenirNextULtltalic.ttf')
    });

    console.log('hello!', useStepCounter())

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <StatusBar hidden={ true }/>
            
                <Text>Steps</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});