import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 15px 10px;
`;

export const ListaFicha = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 50px;
  align-self: stretch;
`;

export const Ficha = styled.View`
  background: rgba(100, 100, 100, 0.5);
  border-radius: 8px;
  padding: 10px;
  flex: 1;
  align-self: stretch;
  margin: 10px;
`;

export const Top = styled(RectButton)`
  flex-direction: row;
`;

export const AvatarFicha = styled.Image.attrs({})`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border-width: 1px;
  border-color: #fff;
`;

export const Mid = styled.View`
  padding: 0px 15px;
`;

export const Nome = styled.Text`
  width: 80%;
  margin-top: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #ddd;
`;

export const Descricao = styled.Text.attrs({
  numberOfLines: 2,
})`
  width: 80%;
  font-size: 13px;
  font-weight: bold;
  color: #333;
`;

export const Down = styled.View`
  padding-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px;
`;

export const AddFicha = styled(RectButton)`
  position: absolute;
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background: #21b54a;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 20px;
`;
