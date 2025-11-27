// components/CollisionModal.tsx
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function CollisionModal({ visible, onClose, data }) {
if (!data) return null;

return (
<Modal
visible={visible}
transparent
animationType="slide"
>
<View style={styles.overlay}>
<View style={styles.box}>
<Text style={styles.title}>{data.title ?? "Collision Details"}</Text>

<Text>Date: {data.date ?? "N/A"}</Text>
<Text>Severity: {data.severity ?? "Unknown"}</Text>
<Text>Description: {data.description ?? "No description available."}</Text>

<Pressable onPress={onClose} style={styles.close}>
<Text style={styles.closeText}>Close</Text>
</Pressable>
</View>
</View>
</Modal>
);
}

const styles = StyleSheet.create({
overlay: {
flex: 1,
backgroundColor: "rgba(0,0,0,0.4)",
justifyContent: "center",
alignItems: "center",
},
box: {
width: "80%",
padding: 20,
backgroundColor: "#fff",
borderRadius: 10,
elevation: 10,
},
title: {
fontSize: 18,
marginBottom: 10,
fontWeight: "600",
},
close: {
marginTop: 20,
padding: 10,
backgroundColor: "#007AFF",
borderRadius: 6,
alignSelf: "flex-end",
},
closeText: { color: "#fff" }
});
