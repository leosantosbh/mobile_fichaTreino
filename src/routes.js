import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';

import Dashboard from './pages/Dashboard';

import FichaUser from './pages/Ficha/FichaUser';
import ExecUser from './pages/Ficha/ExecUser';

import Perfil from './pages/Perfil';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Fichas: {
              screen: createStackNavigator(
                {
                  FichaUser,
                  ExecUser,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Treino',
                tabBarIcon: (
                  <Icon
                    name="fitness-center"
                    size={30}
                    color="rgba(0, 0, 0, 0.6)"
                  />
                ),
              },
            },
            Perfil,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              showLabel: false,
              keyboardHidesTabBar: true,
              activeTintColor: '#000',
              inactiveTintColor: 'rgba(0, 0, 0, 0.6)',
              style: {
                backgroundColor: '#919191',
              },
            },
          }
        ),
      },

      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
