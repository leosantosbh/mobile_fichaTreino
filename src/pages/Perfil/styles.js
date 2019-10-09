import { Platform } from "react-native";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import Input from "~/components/Input";
import Button from "~/components/Button";

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding"
})`
  flex: 1;
  align-items: center;
  padding: 20px 30px;
`;

export const AvatarView = styled.View`
`;

export const Avatar = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  border-width: 3px;
  border-color: #FFF;
`;

export const AlterAvatar = styled(RectButton)`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: #888;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  top: 80px;
`;

export const Form = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
})`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const OutForm = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const TamInput = styled(Input)`
  margin-bottom: 10px;
  width: 48%;
`;

export const PesoInput = styled(Input)`
  margin-bottom: 10px;
  width: 48%;
`;

export const LocalForm = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const CityInput = styled(Input)`
  margin-bottom: 10px;
  width: 72%;
`;

export const StateInput = styled(Input)`
  margin-bottom: 10px;
  width: 24%;
`;


export const SaveButton = styled(Button)`
  margin-top: 5px;
  background: #59b372;
`;


export const ExitButton = styled(Button)`
  margin-top: 5px;
  background: #db6c6c;
`;

