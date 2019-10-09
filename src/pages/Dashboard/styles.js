import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const Borda = styled.View`
  margin-top: 10px;
  border-width: 1px;
  opacity: 0.4;
  color: rgba(0, 0, 0, 0.7);
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #ddd;
  font-weight: bold;
  margin-left: 20px;
`;

export const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #fff;
  margin-right: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 10px;
`;

export const Title2 = styled.Text`
  font-size: 15px;
  padding-top: 10px;
  color: #fff;
  font-weight: bold;
  padding-left: 15px;
  margin-top: 10px;
`;

export const Title3 = styled.Text`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  padding-left: 15px;
  margin-top: 10px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
