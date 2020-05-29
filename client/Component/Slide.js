import React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import Swiper from 'react-native-animated-swiper';
import MedalSrc from './MedalSrc';

const Slide = (props) =>{
        return (
            <Swiper>
                <View style={styles.slide}>

                            {[10000,20000,30000,40000,50000].map((steps,index)=>{
                                if(props.currentGoal-10000>=steps){
                                    return(
                                        <View key={steps} style={styles.medal}>
                                            <Image style={[styles.image,{opacity:1}]} source={MedalSrc[index]}/>
                                            <Text style={{fontFamily:'AvenirNextDemiItalic',color: 'black',opacity:1, fontSize: 15}}>{steps}</Text>
                                        </View>
                                    )
                                }else{
                                    return(
                                        <View key={steps} style={styles.medal}>
                                            <Image style={[styles.image,{opacity:.1}]} source={MedalSrc[index]}/>
                                            <Text style={{fontFamily:'AvenirNextDemiItalic',color: 'black',opacity:.4, fontSize: 15}}>{steps}</Text>
                                        </View>
                                    )
                                }
                            })}
                </View>
                {props.record.data&&props.currentGoal>=10000?<View style={styles.slide}>
                                                                <Image style={styles.image} source={MedalSrc[props.currentGoal/10000-2]}/>
                                                                <Text style={{fontFamily:'AvenirNextULtltalic',color: 'black', fontSize: 18, marginTop:'4%'}}><Text style={{fontFamily:'AvenirNextHeavyCondensed',fontSize: 37}}>{props.record.data}</Text> Steps on {props.record.createdTime}</Text>
                                                            </View>:
                                                            <View style={styles.slide}>
                                                                <Text style={{fontFamily:'AvenirNextULtltalic',color: 'black', fontSize: 18}}>Steps out of your comfort zoom today!</Text>
                                                            </View>}

                <View style={styles.slide}>
                        <Image style={styles.image} source={require('../../assets/icon6.png')}/>
                        <Text style={{fontFamily:'AvenirNextULtltalic',color: 'black', fontSize: 18, marginTop:'4%'}}><Text style={{fontFamily:'AvenirNextHeavyCondensed',fontSize: 37}}>{props.currentGoal-props.todaySteps}</Text> Steps to the next level</Text>
                </View>

                <View style={styles.slide}>
                        <Image style={styles.image} source={require('../../assets/icon7.png')}/>
                        <Text style={{fontFamily:'AvenirNextULtltalic',color: 'black', fontSize: 18, marginTop:'4%'}}><Text style={{fontFamily:'AvenirNextHeavyCondensed',fontSize: 37}}>{props.currentWeekData?props.currentWeekData.reduce((a,b)=> a+b,0):0}</Text> Steps in current week</Text>
                </View>

            </Swiper>
        )
    }


const styles = StyleSheet.create({
    slide: { alignItems: 'center', flex: 1, justifyContent: 'center',flexDirection: 'row' },
    image: {
        height:45,width:45
    },
    medal: {
        width:'18%',height:'100%',flexDirection:'column',justifyContent:'center',alignItems:'center'
    }
  });

  export default Slide;