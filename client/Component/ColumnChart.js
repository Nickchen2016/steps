import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';


const ColumnChart = (props)=>{
    const currentDay = new Date().getDay();
    // console.log('column props!', props);
    return (
        <View style={styles.container}>
            <View style={styles.columnStyle}></View>
            <View style={styles.dateStyle}>
                {['S','M','T','W','T','F','S'].map((day,index)=>{
                    return (
                        <View key={index} style={{marginLeft:6,marginRight:6}}>
                            <TouchableOpacity activeOpacity={1} style={{height:30,width:30,borderRadius:100,backgroundColor:index==currentDay?'black':'white',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                            <Text style={{fontFamily:'AvenirNextULtltalic',color:index!=currentDay?'black':'white',fontSize:18,marginTop:'20%'}}>{day}</Text>
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
        backgroundColor: 'blue',
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