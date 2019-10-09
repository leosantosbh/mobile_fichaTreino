import React, { useState, useEffect } from "react";
import Background from "~/components/Background";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import {
  TouchableOpacity,
  Alert,
  Animated,
  PanResponder,
  Text
} from 'react-native';
import avatar from '~/assets/padrao.png'
import {
  Container,
  Borda,
  ListaExec,
  AvatarExec,
  AvatarImage,
  Exec,
  ExecText,
  Top,
  Top01,
  Title,
  Nome,
  Tipo,
  Seq,
  SeqText,
  Descricao,
  Rep,
  Obs,
  Down,
  AddFichaView,
  AddFicha,
  BotaoCronometro,
  Cronometro
} from './styles';
import api from '~/services/api';
import Modal from 'react-native-modal';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

function ExecUser({ navigation }) {

  const fichausuario = navigation.getParam('ficha');
  const [exercs, setExecs] = useState([]);
  const [visible, setVisible] = useState(false);

  let botaoCronometro = new Animated.Value(1);

  function handleNovoExercicio() {
    Alert.alert('Alerta!', 'Funcionalidade ainda não habilitada');
  };

  async function listaexercicios() {
    const response = await api.get('fichadet', {
      params: {
        ficha_id: fichausuario.id
      }
    });
    setExecs(response.data);
  };

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  useEffect(() => {
    listaexercicios();
  },[]);

  _renderItem = ({item}) => {

      let menuX = new Animated.Value(0);

      _panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
          Animated.event([null, {
            dx: menuX,
          }])(e, gesture);
        },
        onPanResponderRelease: () => {
          Animated.spring(menuX, {
            toValue: 0,
            bounciness: 10,
            duration: 300,
          }).start();
        },
      });

      return (
        <Animated.View
          {... this._panResponder.panHandlers}
          style={
            { transform: [
              { translateX: menuX },
            ]}
          }
        >
          <Exec
            colorBack={item.exercicios.tipo}
          >
            <AvatarExec>
              <AvatarImage source={avatar}></AvatarImage>
            </AvatarExec>
            <ExecText>
              <Top>
                <Top01>
                  <Title>
                    <Nome>{`${item.exercicios.nome} `}</Nome>
                    <Tipo>{`(${item.exercicios.tipo})`}</Tipo>
                  </Title>
                  <Seq>
                    <SeqText>{item.sequencia}</SeqText>
                  </Seq>
                </Top01>
                <Descricao>{item.exercicios.descricao}</Descricao>
                <Rep>{`${item.repeticao} repetições`}</Rep>
                <Obs>{item.obs}</Obs>
              </Top>
              <Down>
                <TouchableOpacity onPress={handleNovoExercicio}>
                  <Icon name="edit" size={22} color="#2d496e" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNovoExercicio}>
                  <Icon name="delete" size={22} color="#db6c6c" />
                </TouchableOpacity>
              </Down>
            </ExecText>
          </Exec>
        </Animated.View>
      )

  }

  return (
    <Background>
      <Container>
        <Borda />
        <ListaExec
          data={exercs}
          keyExtractor={exerc => String(exerc.id)}
          renderItem={_renderItem}
        />
      </Container>
      <AddFichaView>
          <AddFicha onPress={handleNovoExercicio}>
            <Icon name="add" size={40} color="rgb(255,255,255)" />
          </AddFicha>
      </AddFichaView>
      <Animated.View style={{opacity: botaoCronometro}}>
        <BotaoCronometro onPress={open}>
          <Icon name="access-alarm" size={45} color="rgb(255,255,255)" />
        </BotaoCronometro>
      </Animated.View>
      <Modal isVisible={visible} style={{justifyContent: 'center', alignItems: 'center'}}>
        <Cronometro>
          <Text>Hello!</Text>
          <TouchableOpacity onPress={close}>
            <Icon name='close' size={40} color='red' />
          </TouchableOpacity>
        </Cronometro>
      </Modal>
    </Background>
  );
}

ExecUser.navigationOptions = ({ navigation }) => ({
  title: 'Exercícios',
  headerTitleStyle : {justifyContent: 'center', textAlign: 'center',alignSelf:'center', fontWeight: 'bold'},
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={35} color="#FFF" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(ExecUser);

