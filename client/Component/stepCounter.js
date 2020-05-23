import { Pedometer } from 'expo-sensors';
import React, { useState, useEffect } from 'react';


export const useStepCounter = ()=>{

    const [isPedometerAvailable, setisPedometerAvailable] = useState('checking');
    const [pastStepCount, setpastStepCount] = useState(0);
    const [currentStepCount, setcurrentStepCount] = useState(0);

    useEffect(()=>{
        _subscribe();
        return ()=>{
            _unsubscribe();
        }
    },[])

    _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
        setcurrentStepCount(result.steps)
    });

    Pedometer.isAvailableAsync().then(
        result => {
            setisPedometerAvailable(String(result))
        },
        error => {
            setisPedometerAvailable('Could not get isPedometerAvailable: ' + error)
        }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                setpastStepCount(result.steps)
            },
            error => {
                setpastStepCount('Could not get stepCount: ' + error)
            }
        );
    };

    _unsubscribe = () => {
        _subscription && _subscription.remove();
        _subscription = null;
    };

    return {isPedometerAvailable,pastStepCount,currentStepCount};

}