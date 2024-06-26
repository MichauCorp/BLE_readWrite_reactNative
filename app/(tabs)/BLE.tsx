import useBLE from "@/useBLE";
import DeviceModal from "@/DeviceConnectionModal";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,  // Import TextInput component
} from "react-native";

const BLE = () => {
    const {
      requestPermissions,
      scanForPeripherals,
      allDevices,
      connectToDevice,
      connectedDevice,
      disconnectFromDevice,
      writeValueToDevice,
    } = useBLE();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [rawDataToSend, setRawDataToSend] = useState<string>(''); // State for user input data

    const scanForDevices = async () => {
      const isPermissionsEnabled = await requestPermissions();
      if (isPermissionsEnabled) {
        scanForPeripherals();
      }
    };
  
    const hideModal = () => {
      setIsModalVisible(false);
    };
  
    const openModal = async () => {
      scanForDevices();
      setIsModalVisible(true);
    };
  
    const handleWrite = () => {
      // Convert rawDataToSend to Uint8Array (if needed) and write to device
      const dataToSend = new Uint8Array(rawDataToSend.split(',').map(Number));
      writeValueToDevice(dataToSend);
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.heartRateTitleWrapper}>
          {connectedDevice ? (
            <>
            </>
          ) : (
            <Text style={styles.heartRateTitleText}>
              Please Connect to a BLE device
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={connectedDevice ? disconnectFromDevice : openModal}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>
            {connectedDevice ? "Disconnect" : "Connect"}
          </Text>
        </TouchableOpacity>
        
        {/* TextInput for user input */}
        <TextInput
          style={styles.textInput}
          placeholder="Enter data to send"
          onChangeText={setRawDataToSend}  // Update state with user input
          value={rawDataToSend}
        />

        <TouchableOpacity
          onPress={handleWrite}
          style={styles.writeButton}
        >
          <Text style={styles.writeButtonText}>Write</Text>
        </TouchableOpacity>
        <DeviceModal
          closeModal={hideModal}
          visible={isModalVisible}
          connectToPeripheral={connectToDevice}
          devices={allDevices}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
    },
    heartRateTitleWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    heartRateTitleText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: 20,
      color: "black",
    },
    heartRateText: {
      fontSize: 25,
      marginTop: 15,
    },
    ctaButton: {
      backgroundColor: "#FF6060",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginHorizontal: 20,
      marginBottom: 5,
      borderRadius: 8,
    },
    writeButton: {
      backgroundColor: "#4CAF50",
      padding: 10,
      marginTop: 10,
      borderRadius: 8,
    },
    writeButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    ctaButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 20,
      paddingHorizontal: 10,
    },
  });
  
  export default BLE;
