import { Alert } from "react-native";

export function showConnectionAlert() {
    
    const connectionErrorTitle = "Bağlantı hatası";
    const connectionErrorText = "";
    const okText = "Tamam"

    Alert.alert(
        connectionErrorTitle,
        connectionErrorText,
        [
            {
                text: okText,
                onPress: () => {}
            }
        ],
        {
            cancelable: true,
            onDismiss: () => {}
        }
     )
  }