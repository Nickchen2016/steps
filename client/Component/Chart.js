import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useStepCounter } from './counterLogic';
import { connect } from 'react-redux';
import { createNewWeek, updateData, removeData } from '../redux/getData';
import { postRecord,patchRecord } from '../redux/getRecord';

import ModalWindow from './ModalWindow';
import ColumnChart from './ColumnChart';
import Slide from './Slide';
import CircularChart from './CircularChart';


const Chart = (props)=> {
    const [totalStepCount,settotalStepCount ] = useStepCounter();
    const [currentGoal,setcurrentGoal] = useState(0);
    const [currentWeekBest,setcurrentWeekBest] = useState({});
    const [currentWeekData,setcurrentWeekData] = useState([0,0,0,0,0,0,0]);
    const [lastWeekData,setlastWeekData] = useState([0,0,0,0,0,0,0]);

    const currentTime = new Date();

    useEffect(()=>{
        updateData(currentTime);
        getCurrentGoal();
        getWeekData(currentTime);
    },[totalStepCount])

    const updateData = (currentTime)=>{
      // console.log('updateData has been called', totalStepCount)
        const currentWeekDay = currentTime.getDay();
        const endingTime = new Date().setHours(23,59,59,999);
        const milliseconds = Math.abs(endingTime-currentTime.getTime());
        const MILLISECONDS_IN_A_DAY = 86400000;
        const idArr = []; //week id arr
        props.data&&props.data.map(week=>idArr.push(week._id));
    
        let postAtMidNight = setTimeout(function tick(){

            if(idArr.length>=2 && currentWeekDay===0){
              props.removeData({id:idArr[0]});
            }
            if(idArr.length===0&&Object.key(props.record).length===0){
              props.postRecord({ data:totalStepCount })
            }
            if(idArr.length===0 || currentWeekDay===0){
              props.createNewWeek({date:currentWeekDay,steps:totalStepCount});
            }else{
              props.updateData({id:idArr[idArr.length-1],date:currentWeekDay,steps:totalStepCount});
              if(totalStepCount>props.record.data){
                props.patchRecord({ id:props.record._id,data:totalStepCount })
              }
            }
          
            postAtMidNight = setTimeout(tick,MILLISECONDS_IN_A_DAY)
        },milliseconds)
    }

    //Get the next step goal
    const getCurrentGoal = ()=> {
      // console.log('getCurrentGoal has been called', totalStepCount)
        let currentGoal = 0;
        if(props.record.data&&props.record.data.toString().length>4){
            currentGoal+=(Number(props.record.data.toString()[0])+1)*10000;
            setcurrentGoal(currentGoal);
        }else{
            currentGoal+=10000;
            setcurrentGoal(currentGoal);
        }
    }

    //Get current and last week's step data
    getWeekData=(currentTime)=>{
      // console.log('getWeekData has been called', totalStepCount)
        const currentWeekDay = currentTime.getDay();
        const currentWeekData = [0,0,0,0,0,0,0], lastWeekData = [0,0,0,0,0,0,0];
        props.data&&props.data.length===2?props.data[0].dates.map(d=>lastWeekData[d.date]=d.steps):'';
        props.data&&props.data.length>0?props.data[props.data.length-1].dates.map(d=>currentWeekData[d.date]=d.steps):'';
        currentWeekData[currentWeekDay]=totalStepCount;
        const currentweekBestStep = Math.max.apply(null,currentWeekData);
        const currentWeekBestDay = {date:currentWeekData.indexOf(currentweekBestStep),step:currentweekBestStep};


        setcurrentWeekBest(currentWeekBestDay);
        setcurrentWeekData(currentWeekData);
        setlastWeekData(lastWeekData);
    }


    return (
        <View style={styles.container}>
            <StatusBar hidden={ true }/>
            <View>
                <ModalWindow 
                currentGoal={currentGoal} 
                todaySteps={totalStepCount}
                />
            </View>
            <View style={styles.columnBar}>
                <ColumnChart lastWeekData={lastWeekData} currentWeekData={currentWeekData} currentWeekBest={currentWeekBest} currentGoal={currentGoal} currentTime={currentTime} style={styles.columnBar}/>
            </View>
            <View style={styles.slideBar}>
                <Slide todaySteps={totalStepCount} currentGoal={currentGoal} currentWeekData={currentWeekData} record={props.record} style={styles.columnBar}/>
            </View>
            <View style={styles.circularBar}>
                <CircularChart todaySteps={totalStepCount} currentGoal={currentGoal} style={styles.columnBar}/>
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
    width: '100%'
  },
  circularBar: {
    height: '50%',
    width: '100%'
  }
});

export default connect(mapState,mapDispatch)(Chart);