import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useStepCounter } from './stepCounter';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import ColumnChart from './ColumnChart';
import Slide from './Slide';
import CircularChart from './CircularChart';


const Chart = (props)=> {
    const currentStepCount = useStepCounter().currentStepCount;
    const pastStepCount = useStepCounter().pastStepCount;
    const isPedometerAvailable = useStepCounter().isPedometerAvailable;

    let [fontsLoaded] = useFonts({
        'AvenirNextHeavyItalic': require('../../assets/fonts/AvenirNextHeavyItalic.ttf'),
        'AvenirNextULtltalic': require('../../assets/fonts/AvenirNextULtltalic.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        console.log('here is the props in chart: ', props.data,props.record)
        return (
            <View style={styles.container}>
                <StatusBar hidden={ true }/>
            
                <Text>Steps</Text>

            </View>
        );
    }
}

const mapState = state => {
    return {
      data: state.getData,
      record: state.getRecord
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapState)(Chart);