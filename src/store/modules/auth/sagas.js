import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "~/services/api";

import { signInSuccess, signUpSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { telefone, codigo } = payload;

    const response = yield call(api.post, "session", {
      telefone: `+55${telefone}`,
      codigo
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert("Erro na requisição", err.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { telefone } = payload;

    const response = yield call(api.post, "users", {
      telefone: `+55${telefone}`
    });

    const { codigo } = response.data;

    yield put(signUpSuccess(telefone, codigo));

    Alert.alert(`Usuário ${telefone}`, `Código de acesso: ${codigo}`);

    // history.push('/');
  } catch (err) {
    Alert.alert("Erro na requisição", err.response.data.error);

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export function* resetUp({ payload }) {
  try {
    const { telefone } = payload;

    const response = yield call(api.put, "users", {
      telefone: `+55${telefone}`
    });

    const { codigo } = response.data;

    yield put(signUpSuccess(telefone, codigo));

    Alert.alert(`Usuário ${telefone}`, `Código de acesso: ${codigo}`);

    // history.push('/');
  } catch (err) {
    Alert.alert("Erro na requisição", err.response.data.error);

    yield put(signFailure());
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp),
  takeLatest("@auth/RESET_REQUEST", resetUp),
  takeLatest("@auth/SIGN_OUT", signOut)
]);
