import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Background from "~/components/Background";
import api from '~/services/api';
import getRealm from '~/services/realm'

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
  const [off, setOff] = useState(false)

  async function loadfichas() {
    const response = await api.get('fichas');
    setFichas(response.data);
  };

  async function loadfichaslocal() {
    const realm = await getRealm();

    const data = realm.objects('Ficha').sorted('id', true)

    setFichas(data)
  };

  useEffect(() => {
    loadfichaslocal()
    setOff(true)
  },[isFocused])

  async function saveFichas(ficha) {

    const data = {
      id: ficha.id,
      user_id: ficha.users.id,
      nome: ficha.nome,
      descricao: ficha.descricao
    }
    const realm = await getRealm()

    realm.write(() => {
      realm.create('Ficha', data)
    })
  }

  async function handleFichasOffline() {

    const realm = await getRealm()

    realm.write(() => {
      realm.deleteAll()
    })

    const response = await api.get('fichas');

    response.data.map(date => {
      saveFichas(date)
    })
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
                <AvatarFicha source={off ? {uri: `https://api.adorable.io/avatar/50/Teste.png`}: {uri: ficha.users.avatars ? ficha.users.avatars.caminho : `https://api.adorable.io/avatar/50/${ficha.nome}.png`}} />
                <Mid>
                  <Nome>{ficha.nome}</Nome>
                  <Descricao>{ficha.descricao}</Descricao>
                </Mid>
              </Top>
              <Down>
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="edit" size={35} color="#62c5cc" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="delete" size={35} color="#cf5959" />
                </TouchableOpacity>
              </Down>
            </Ficha>
          )}

        />
      </Container>
      <AddFicha onPress={handleFichasOffline}>
        <Icon name="signal-wifi-off" size={25} color="rgb(255,255,255)" />
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
