import { Platform, Dimensions } from "react-native";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding"
})`
  margin-top: 60px;
  flex: 1;
  align-items: center;
`;

export const Borda = styled.View`
  margin-top: 10px;
  border-width: 1px;
  opacity: 0.4;
  color: rgba(100,100,100,0.70);
`

export const ListaExec = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const Exec = styled.View`
  background: ${props => ((props.colorBack === 'Musculação') ? '#b4dbad' : (props.colorBack === 'Abdominal' ? '#addbd4' : '#dbadad'))};
  align-self: stretch;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: rgba(100,100,100,0.70);
`;

export const AvatarExec = styled.View`
  border-right-width: 1px;
  border-right-color: rgba(255,255,255,0.4);
  justify-content: center;
  align-items: center;
  width: 110px;
`;

export const AvatarImage = styled.Image`
  height: 70px;
  width: 90px;
`;

export const ExecText = styled.View`
  flex: 1;
  padding: 5px 0px 5px 0px;
`;

export const Top = styled.View`
  flex-direction: column;
  margin: 0 10px;
`;

export const Top01 = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px 5px 0px 0px;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Nome = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #222;
`;

export const Tipo = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  font-weight: bold;
  color: #444;
  margin-bottom: 3px;
`;

export const Seq = styled.View`
  align-items: flex-end;
`;

export const SeqText = styled.Text`
  font-size: 13px;
  color: #000;
`;

export const Descricao = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Rep = styled.Text`
  font-size: 10px;
  color: #666;
`;

export const Obs = styled.Text`
  font-size: 10px;
  color: #666;
`;

export const Down = styled.View`
  padding-top: 4px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px;
`;

export const AddFichaView = styled.View`
  position: absolute;
  top:10px;
  right:50px;
`

export const AddFicha = styled(RectButton)`
  position: absolute;
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20;
  background: #21b54a;
`;

export const BotaoCronometro = styled(RectButton)`
  position: absolute;
  bottom: 10px;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 30px;
  background: rgba(30, 53, 89,0.8);
`;

export const Cronometro = styled.View`
  height: 200px;
  width: 300px;
  border-radius: 8px;
  background: #fff;
  justify-content: center;
  align-items: center;
`;
