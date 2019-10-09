import React, { useRef, useState, useEffect } from "react";
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from "react-redux"
import Background from "~/components/Background";
import { Alert } from 'react-native';
import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

import {
  Container,
  AvatarView,
  Avatar,
  AlterAvatar,
  Form,
  FormInput,
  OutForm,
  TamInput,
  PesoInput,
  LocalForm,
  CityInput,
  StateInput,
  SaveButton,
  ExitButton
} from './styles';

function Perfil({ isFocused }) {
  const { id } = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const tamanhoRef = useRef();
  const pesoRef = useRef();
  const cidadeRef = useRef();
  const estadoRef = useRef();

  const [nome, setNome] = useState('Aluno');
  const [email, setEmail] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [peso, setPeso] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newAvatar, setNewAvatar] = useState('');

  async function loadUser() {
    const response = await api.get('userdets');
    setNome(response.data.users.nome);
    setEmail(response.data.users.email);
    setTamanho(response.data.tamanho);
    setPeso(response.data.peso);
    setCidade(response.data.cidade);
    setEstado(response.data.estado);
    setAvatar(response.data.users.avatars.caminho);
  };

  useEffect(() => {
    setAvatar('');
    loadUser();
  }, [isFocused]);


  function handleSelecionarImagem() {
    ImagePicker.showImagePicker({
      title: 'Selecionar imagem',
      takePhotoButtonTitle: 'Tirar foto...',
      chooseFromLibraryButtonTitle: 'Escolher imagem local ...',
      chooseWhichLibraryTitle: 'Escolher imagem local ...',
      cancelButtonTitle: 'Cancelar'
    }, upload => {
      if(upload.error){

      } else if (upload.didCancel) {

      } else {
        setAvatar(`data:image/jpeg;base64,${upload.data}`)

        let prefix;
        let ext;

        if(upload.fileName) {
          [prefix, ext] = upload.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }

        setNewAvatar({
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`
        })
      }
    })
  }

  async function handleUpdate() {
    if(newAvatar){
      const image = new FormData();
      image.append('file', newAvatar);
      await api.post('avatars', image)
    }
    await api.put(`userdets/${id}`, {
      nome,
      email,
      tamanho,
      peso,
      cidade,
      estado
    })
    Alert.alert('Dados Atualizados com Sucesso!');
    loadUser();
  }

  function handleLogout() {
    dispatch(signOut())
  }

  return (
    <Background>
      <Container>
        <AvatarView>
          <Avatar source={{uri: avatar ? avatar : `https://api.adorable.io/avatar/50/${nome}.png`}}></Avatar>
          <AlterAvatar onPress={handleSelecionarImagem}>
            <Icon name="photo-camera" size={40} color="rgba(255,255,255, 0.8)" />
          </AlterAvatar>
        </AvatarView>
        <Form>
          <FormInput
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={nome}
            onChangeText={setNome}
          />
          <FormInput
            icon="mail"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => tamanhoRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <OutForm>
            <TamInput
              icons="arrow-expand-vertical"
              keyboardType="phone-pad"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Tamanho (cm)"
              ref={tamanhoRef}
              returnKeyType="next"
              onSubmitEditing={() => pesoRef.current.focus()}
              value={String(tamanho)}
              onChangeText={setTamanho}
            />
            <PesoInput
              icons="scale-balance"
              keyboardType="phone-pad"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Peso (kg)"
              ref={pesoRef}
              returnKeyType="next"
              onSubmitEditing={() => cidadeRef.current.focus()}
              value={String(peso)}
              onChangeText={setPeso}
            />
          </OutForm>
          <LocalForm>
            <CityInput
              icon="location-on"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Cidade"
              ref={cidadeRef}
              returnKeyType="next"
              onSubmitEditing={() => estadoRef.current.focus()}
              value={cidade}
              onChangeText={setCidade}
            />
            <StateInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="UF"
              ref={estadoRef}
              returnKeyType="send"
              value={estado}
              onChangeText={setEstado}
            />
          </LocalForm>
          <SaveButton onPress={handleUpdate}>
                Atualizar Dados
          </SaveButton>
          <ExitButton onPress={handleLogout}>
                Sair do Aplicativo
          </ExitButton>
        </Form>
      </Container>
    </Background>
  );
}

Perfil.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={30} color={tintColor} />
  ),
};

export default withNavigationFocus(Perfil);
