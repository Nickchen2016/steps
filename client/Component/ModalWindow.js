import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import MedalSrc from './MedalSrc';
import { connect } from 'react-redux';
import { patchRecord } from '../redux/getRecord';

const ModalWindow = props => {
    const [isModalVisible, setisModalVisible] = useState(false);

    useEffect(()=>{
        if(props.todaySteps!=0&&props.todaySteps===props.currentGoal){
            props.patchRecord({ id:props.record._id,data:props.todaySteps });
        }
    },[props.todaySteps])
    // console.log('modal props!', props);

        return(
            <View style={styles.container} >
                    <Modal 
                        isVisible={isModalVisible} 
                        style={styles.modal}
                        transparent= {true}
                        backdropOpacity={.4}
                        animationType={'fade'}
                    >
                        <TouchableOpacity 
                            onPress={()=>setisModalVisible(!isModalVisible)} 
                            style={styles.innerView}
                        >
                            <Text style={{fontFamily:'AvenirNextDemiItalic',textAlign:'center',fontSize:26,lineHeight:30, marginTop:'5%'}}>Congratuation for your{"\n"}new record with  
                                <Text style={{fontFamily:'AvenirNextHeavyCondensed',fontSize:26}}>{props.todaySteps}</Text>{"\n"}of steps in a day!
                            </Text>
                            <Image style={{width:60,height:60}} source={MedalSrc[props.currentGoal/10000-2]}/>
                        </TouchableOpacity>
                    </Modal>        
            </View>
        )
}

const mapState = state =>{
    return {record: state.getRecord}
}
const mapDispatch = dispatch =>({
    patchRecord: (data)=> dispatch(patchRecord(data))
})

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        width:'100%', height:'100%',
        flexDirection:'row',alignItems:'center',justifyContent:'center'
    },
    modal: {
        flex:0,height:200,
        backgroundColor:'white',
        borderRadius: 20, marginTop:'60%'
    },
    innerView: {
        flexDirection: 'column',
        height:200,
        alignItems:'center', marginTop:'60%'
    }
})

export default connect(mapState,mapDispatch)(ModalWindow);