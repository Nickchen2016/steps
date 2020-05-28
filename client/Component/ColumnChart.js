import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';


const ColumnChart = (props)=>{

    return (
        <View style={styles.container}>
            <View style={styles.columnStyle}>

                <View style={styles.box1}>
                        {props.lastWeekData&&props.lastWeekData.map((step,index)=>{
                            if(step!=0){
                                return(
                                    <View key={index} style={styles.outline}>
                                        <TouchableOpacity style={[styles.column1,{height:Math.floor(step/props.currentGoal*130)}]}></TouchableOpacity>
                                    </View>
                                )
                            }else{
                                return(<View key={index} style={styles.outline}></View>)
                            }
                        })}
                    </View>
                    <View style={styles.box2}>
                    {props.currentWeekData&&props.currentWeekData.map((step,index)=>{
                        if(step!=0&&props.currentWeekBest.step===step){
                            return(
                                <View key={index} style={styles.outline}>
                                    <TouchableOpacity style={[styles.column2,{height:Math.floor(step/props.currentGoal*130)}]}>
                                    <TouchableOpacity style={{borderRadius:100,maxWidth:55,minWidth:46,height:18,backgroundColor:'black',marginTop:'-140%'}}>
                                        <Text style={{position:'absolute',fontFamily:'AvenirNextDemiItalic',color:'white', fontSize:15,textAlign:'center',marginTop:'6%',left:2,right:2}}>{props.currentWeekBest.step}</Text>
                                    </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        else if(step!=0&&props.currentWeekBest.step!=step){
                            return(
                                <View key={index} style={styles.outline}>
                                    <TouchableOpacity style={[styles.column2,{height:Math.floor(step/props.currentGoal*130)}]}></TouchableOpacity>
                                </View>
                            )
                        }
                        else{
                            return(<View key={index} style={styles.outline}></View>)
                        }
                    })}
                </View>

            </View>
            <View style={styles.dateStyle}>
                {['S','M','T','W','T','F','S'].map((day,index)=>{
                    return (
                        <View key={index} style={{marginLeft:7,marginRight:7,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            {index===props.currentTime.getDay()?<Text style={{fontFamily:'AvenirNextDemiItalic',color:'black',fontSize:18}}>Today</Text>:<Text style={{fontFamily:'AvenirNextDemiItalic',color:'black',fontSize:18,marginLeft:'2%'}}> </Text>}
                            <TouchableOpacity activeOpacity={1} style={{height:30,width:30,borderRadius:100,backgroundColor:index==props.currentTime.getDay()?'black':'white',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                            <Text style={{fontFamily:'AvenirNextDemiItalic',color:index!=props.currentTime.getDay()?'black':'white',fontSize:18,marginTop:'20%'}}>{day}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width:'100%', 
        height:'100%'
    },
    columnStyle: {
        height: '75%',
        width:'100%', flexDirection:'row',alignItems:'center'
    },
    box1: {
        width:'100%', height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'
    },
    box2: {
        width:'100%', height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',
        marginLeft:'-100%'
    },
    outline: {
        width: '12%',
        height:'88%',
        alignItems:'center'
    },
    column1: {
        position: 'absolute',
        bottom:0,
        margin: '5% 0% 5% 0%',
        width:15,
        backgroundColor:'rgba(0,0,0,.2)',
        borderRadius: 100
    },
    column2: {
        position: 'absolute',
        bottom:0,
        margin: '5% 0% 5% 0%',
        width:15,
        backgroundColor:'rgba(0,0,0,.6)',
        borderRadius: 100,
        alignItems:'center'
    },
    dateStyle: {
        display: 'flex',
        height: '25%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center'
    }
})

export default ColumnChart;