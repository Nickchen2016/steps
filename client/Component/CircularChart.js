import React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default CircularChart = props =>{

    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={320}
                width={20}
                fill={Math.floor(props.todaySteps/props.currentGoal*100)+1}
                prefill={0}
                tintColor="black"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#bcbec0"
            >
                {
                    fill => (
                        <View style={{flexDirection:'column',alignItems:'center'}}>
                            <Text style={{fontFamily:'AvenirNextHeavyCondensed',fontSize:72}}>
                                {props.todaySteps}
                            </Text>
                            <View style={{flexDirection:'row',marginTop:'-5%'}}>
                                <Text style={{fontFamily:'AvenirNextDemiItalic',fontSize:50}}>{(props.todaySteps/2000).toFixed(1)} mi</Text>
                                <Image style={{height:60,width:60,marginTop:'-5%'}} source={require('../../assets/walk.png')}/>
                            </View>
                        </View>
                    )
                }
            </AnimatedCircularProgress>
        </View>  
    )
}

const styles = StyleSheet.create({
   container: {
       width:'100%',height:'100%',
       alignItems:'center',
       marginTop: '10%'
   }
  });