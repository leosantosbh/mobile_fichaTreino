import { Platform } from "react-native";
import styled from "styled-components/native";

import Input from "~/components/Input";
import Button from "~/components/Button";

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding"
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #52b3b9;
`;

export const Submit = styled.View`
  margin-top: 5px;
  justify-content: space-between;
  flex-direction: row;
`;

export const CreateButton = styled(Button)`
  margin-top: 5px;
  width: 47%;
  background: #59b372;
`;

export const ResetButton = styled(Button)`
  margin-top: 5px;
  width: 47%;
  background: #db6c6c;
`;
