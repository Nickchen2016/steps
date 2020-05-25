import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';


const ColumnChart = (props)=>{

    console.log('column props!', props);
    return (
        <View>
            <View></View>
            <View>
                {['S','M','T','W','T','F','S'].map((day,index)=>{
                    return (
                        <View>
                            <TouchableOpacity activeOpacity={1} style={{height:'38%',width:'65%',borderRadius:100,backgroundColor:'black',alignItems: 'center',justifyContent: 'center'}}>
                            <Text style={{fontFamily:'AvenirNextULtltalic',color:'white',fontSize:18,marginTop:'20%'}}>{day}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )

}

export default ColumnChart;