import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Skeleton from "./src/components/Skeleton";

export default function App() {
  return (
    <View style={styles.container}>
      <Skeleton width={260} height={260} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
