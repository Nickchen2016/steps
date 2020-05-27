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

    //pedometer function
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
    end.setHours(23,59,59,999);
    const start = new Date();
    start.setHours(0,0,0,0);
    Pedometer.getStepCountAsync(start, end).then(
            result => {
                setpastStepCount(result.steps)
            },
            error => {
                setpastStepCount('Could not get stepCount: ' + error)
            }
        );
    };

    //unsubscribe pedometer
    _unsubscribe = () => {
        _subscription && _subscription.remove();
        _subscription = null;
    };
    
    return [pastStepCount+currentStepCount];

}