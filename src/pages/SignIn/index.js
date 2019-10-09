import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import {
  signInRequest,
  signUpRequest,
  resetRequest,
} from '../../store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Submit,
  CreateButton,
  ResetButton,
} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const codigoRef = useRef();

  const [telefone, setTelefone] = useState('');
  const [codigo, setCodigo] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(telefone, codigo));
  }

  async function handlecreateSubmit() {
    await dispatch(signUpRequest(telefone));
  }

  async function handleresetSubmit() {
    await dispatch(resetRequest(telefone));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="local-phone"
            keyboardType="phone-pad"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Telefone"
            returnKeyType="next"
            onSubmitEditing={() => codigoRef.current.focus()}
            value={telefone}
            onChangeText={setTelefone}
          />
          <FormInput
            icon="lock-outline"
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder="Código"
            ref={codigoRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={codigo}
            onChangeText={setCodigo}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
          <Submit>
            <CreateButton onPress={handlecreateSubmit}>
              Críar Usuário
            </CreateButton>
            <ResetButton onPress={handleresetSubmit}>Novo Código</ResetButton>
          </Submit>
        </Form>
      </Container>
    </Background>
  );
}
