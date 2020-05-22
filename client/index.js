import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from './Component/Home';
import Chart from './Component/Chart';

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Chart" title="Chart" component={Chart} options={{ cardStyleInterpolator: forFade }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}