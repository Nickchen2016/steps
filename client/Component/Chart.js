import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useStepCounter } from './counterLogic';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { createNewWeek, updateData, removeData } from '../redux/getData';
import { postRecord,patchRecord } from '../redux/getRecord';

import ColumnChart from './ColumnChart';
import Slide from './Slide';
import CircularChart from './CircularChart';


const Chart = (props)=> {
    const [totalStepCount,settotalStepCount ] = useStepCounter();
    const currentTime = new Date();
    console.log('here we got the data in chart page',props.data,props.record);

    useEffect(()=>{
        updateData(currentTime);

    },[])

    const updateData = (currentTime)=>{
        const currentWeekDay = currentTime.getDay();
        const time = currentTime.setHours(23,59,59,999);
        const milliseconds = currentTime.getTime()-new Date().getTime();
        const MILLISECONDS_IN_A_DAY = 86400000;
        const totalSteps = totalStepCount;
        const idArr = []; //week id arr
        props.data&&props.data.map(week=>idArr.push(week._id));
        // console.log('~~~~~', currentWeekDay, time,milliseconds, idArr)
    
        let postAtMidNight = setTimeout(function tick(){
     
            if(idArr.length>=2 && currentWeekDay===0){
              props.removeData({id:idArr[0]});
            }
            if(idArr.length===0&&Object.key(props.record).length===0){
              props.postRecord({ data:totalSteps })
            }
            if(idArr.length===0 || currentWeekDay===0){
              props.createNewWeek({date:currentWeekDay,steps:totalSteps});
            }else{
              props.updateData({id:idArr[idArr.length-1],date:currentWeekDay,steps:totalSteps});
              if(totalSteps>props.record.data){
                props.patchRecord({ id:props.record._id,data:totalSteps })
              }
            }
          
            postAtMidNight = setTimeout(tick,MILLISECONDS_IN_A_DAY)
        },milliseconds)
    }


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
      record: state.getRecord[0]
    }
};
const mapDispatch = dispatch=>({
    createNewWeek: (credentials)=> dispatch(createNewWeek(credentials)),
    updateData: (credentials)=> dispatch(updateData(credentials)),
    removeData: (id)=> dispatch(removeData(id)),
    postRecord: (data)=> dispatch(postRecord(data)),
    patchRecord: (data)=> dispatch(patchRecord(data))
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default connect(mapState,mapDispatch)(Chart);