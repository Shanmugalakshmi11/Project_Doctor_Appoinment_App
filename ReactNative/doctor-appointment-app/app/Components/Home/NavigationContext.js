// navigationService.js
import { CommonActions } from "@react-navigation/native";

let navigator;

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

export function navigate(name, params) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    );
  }
}
