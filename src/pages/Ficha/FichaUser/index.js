import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Background from "~/components/Background";
import api from '~/services/api';

import {
  Container,
  ListaFicha,
  Ficha,
  Top,
  AvatarFicha,
  Mid,
  Nome,
  Descricao,
  Down,
  AddFicha
} from './styles';

function FichaUser({ navigation, isFocused }) {

  const [fichas, setFichas] = useState([]);

  async function loadfichas() {
    const response = await api.get('fichas');
    setFichas(response.data);
  };

  useEffect(() => {
    loadfichas()
  },[isFocused])

  function handleNovaFicha() {
    Alert.alert('Alerta!', 'Funcionalidade ainda não habilitada');
  }

  return (
    <Background>
      <Container>
        <ListaFicha
          data={fichas}
          keyExtractor={ficha => String(ficha.id)}
          renderItem={({item: ficha}) => (
            <Ficha>
              <Top onPress={() => {
                navigation.navigate('ExecUser', { ficha });
              }}>
                <AvatarFicha source={{uri: ficha.users.avatars ? ficha.users.avatars.caminho : `https://api.adorable.io/avatar/50/${ficha.nome}.png`}} />
                <Mid>
                  <Nome>{ficha.nome}</Nome>
                  <Descricao>{ficha.descricao}</Descricao>
                </Mid>
              </Top>
              <Down>
                <TouchableOpacity onPress={handleNovaFicha}>
                  <Icon name="edit" size={35} color="#62c5cc" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNovaFicha}>
                  <Icon name="delete" size={35} color="#cf5959" />
                </TouchableOpacity>
              </Down>
            </Ficha>
          )}

        />
      </Container>
      <AddFicha onPress={handleNovaFicha}>
        <Icon name="add" size={44} color="rgb(255,255,255)" />
      </AddFicha>
    </Background>
  );
}

FichaUser.navigationOptions = ({ navigation }) => ({
  title: 'Fichas de Treino',
  headerTitleStyle : {textAlign: 'center',alignSelf:'center', fontWeight: 'bold'},
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={35} color="#FFF" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(FichaUser);
