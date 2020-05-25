import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useStepCounter } from './counterLogic';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';

import ColumnChart from './ColumnChart';
import Slide from './Slide';
import CircularChart from './CircularChart';


const Chart = (props)=> {
    const [totalStepCount,settotalStepCount ] = useStepCounter();
    // console.log('here we got the data in chart page',totalStepCount);

    // console.log('here is the props in chart: ', props.data,props.record)
    return (
        <View style={styles.container}>
            <StatusBar hidden={ true }/>
            <View style={styles.columnBar}>
                <ColumnChart data={props} style={styles.columnBar}/>
            </View>
            <View style={styles.slideBar}>
                <Slide data={props} style={styles.columnBar}/>
            </View>
            <View style={styles.circularBar}>
                <CircularChart data={props} style={styles.columnBar}/>
            </View>
        </View>
    );
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
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnBar: {
    height: '40%',
    width: '100%'
  },
  slideBar: {
    height: '10%',
    width: '100%',
    backgroundColor: 'red'
  },
  circularBar: {
    height: '50%',
    width: '100%'
  }
});

export default connect(mapState)(Chart);