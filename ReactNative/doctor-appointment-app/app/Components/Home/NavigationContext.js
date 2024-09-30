import { CommonActions } from "@react-navigation/native";

let navigator;

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef; // Set the navigator reference
}

export function navigate(name, params) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    );
  } else {
    console.warn("Navigator is not set. Cannot navigate."); // Add a warning
  }
}
