import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Dimensions, Text } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import api from '~/services/api';

import {
  Container,
  Title,
  Title2,
  Title3,
  User,
  Name,
  Avatar,
  Borda,
} from './styles';

function Dashboard({ navigation, isFocused }) {
  const screenWidth = Dimensions.get('window').width - 30;

  const data = [
    {
      name: 'Musculação',
      population: 25,
      color: '#8cc482',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Abdominal',
      population: 12,
      color: '#79bab0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Cardio',
      population: 8,
      color: '#ad7171',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };

  const [user, setUser] = useState([]);

  async function loadUser() {
    const response = await api.get('users');

    setUser(response.data);
  }

  useEffect(() => {
    loadUser();
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <User>
          <Name>{`Bora Treinar, ${user.nome}`}</Name>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Perfil');
            }}
          >
            <Avatar
              source={{
                uri: user.avatars
                  ? user.avatars.caminho
                  : `https://api.adorable.io/avatar/50/${user.name}.png`,
              }}
            />
          </TouchableOpacity>
        </User>
        <Borda />
        <Title>Painel de Treino</Title>
        <Title2>Resumo da Ficha:</Title2>
        <PieChart
          data={data}
          width={screenWidth}
          height={180}
          chartConfig={{
            backgroundColor: '#365a85',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
          backgroundColor="none"
          accessor="population"
          style={{
            paddingTop: 5,
            alignSelf: 'center',
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Title3>Evolução Peso(kg):</Title3>
        <LineChart
          data={{
            labels: ['abr/19', 'jun/19', 'set/19'],
            datasets: [
              {
                data: [82.0, 80.5, 81.7],
              },
            ],
          }}
          width={screenWidth}
          height={180}
          chartConfig={{
            backgroundGradientFrom: '#365a85',
            backgroundGradientTo: '#74b87c',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
            },
          }}
          bezier
          style={{
            paddingTop: 5,
            alignSelf: 'center',
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Painel',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="menu" size={35} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
