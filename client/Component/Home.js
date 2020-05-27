import React, { useEffect }from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import { connect } from 'react-redux';
import { fetchData } from '../redux/getData';
import { fetchRecord } from '../redux/getRecord';

const Home = (props)=> {
    
    let [fontsLoaded] = useFonts({
        'AvenirNextHeavyItalic': require('../../assets/fonts/AvenirNextHeavyItalic.ttf'),
        'AvenirNextULtltalic': require('../../assets/fonts/AvenirNextULtltalic.ttf'),
        'AvenirNextDemiItalic': require('../../assets/fonts/AvenirNextDemiItalic.ttf'),
        'AvenirNextHeavyCondensed': require('../../assets/fonts/AvenirNextHeavyCondensed.ttf'),
    });

    useEffect(()=>{
        props.fetchInitialData();
        props.fetchInitialRecord();
    },[])

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        setTimeout(() => {
            props.navigation.navigate('Chart')
        }, 3000)
        return (
            <View style={styles.container} >
                <Text style={[styles.logoFont,{fontFamily: 'AvenirNextHeavyItalic'}]}>Steps.</Text>
                <Text style={[styles.subFont,{fontFamily: 'AvenirNextULtltalic'}]}>Step out of your comfort zoom</Text>
            </View>
        );
    }
}

const mapState = null;
const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchData())
  },
  fetchInitialRecord: () => {
    dispatch(fetchRecord())
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFont: {
    fontSize: 90,
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  subFont: {
    marginTop:-6, marginLeft:-15,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: 'black'
  }
});

export default  connect(mapState, mapDispatch)(Home);