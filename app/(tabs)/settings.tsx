import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {router, Stack} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  // Toggle function for the switch
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // Handle button presses
  const handleButtonPress = (buttonName: string) => {
    console.log(`${buttonName} pressed`);
    // Add navigation or functionality for each button here
  };

  // Dynamic styles based on dark mode
  const dynamicStyles = isEnabled ? darkStyles : lightStyles;

  return (
      <>
        <Stack.Screen
            options={{
              headerShown: true,
              title: 'Settings',
              headerStyle: {
                backgroundColor: isEnabled ? Colors.dark.background : Colors.light.background,
              },
              headerTintColor: isEnabled ? Colors.dark.text : Colors.light.text,
            }}
        />
        <View style={[styles.container, dynamicStyles.container]}>
          {/* About */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('About')}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>About</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Send Feedback */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('Send Feedback')}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Send Feedback</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('Privacy Policy')}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Privacy Policy</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Terms of Use */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('Terms of Use')}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Terms of Use</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Dark Mode Toggle */}
          <TouchableOpacity style={[styles.itemBtn, dynamicStyles.itemBtn]} onPress={toggleSwitch}>
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Dark Mode</Text>
            <Switch
                trackColor={{ false: '#767577', true: Colors.light.tint }}
                thumbColor={isEnabled ? Colors.light.tint : '#ffffff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ transform: [{ scale: 0.8 }], marginBottom: -15, marginRight: -8 }}
            />
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => {
                handleButtonPress('Log out');
                router.replace("/login"); // Navigate to login
              }}
          >
            <Text style={[styles.itemBtnText, { color: 'red' }]}>Log out</Text>
            <MaterialIcons name="logout" size={16} color="red" />
          </TouchableOpacity>

        </View>
      </>
  );
};

export default Page;

// Base styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

// Light mode styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  itemBtn: {
    backgroundColor: Colors.light.white,
    borderBottomColor: Colors.light.lightGrey,
  },
  itemBtnText: {
    color: Colors.light.black,
  },
});

// Dark mode styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  itemBtn: {
    backgroundColor: Colors.dark.white,
    borderBottomColor: Colors.dark.lightGrey,
  },
  itemBtnText: {
    color: Colors.dark.black,
  },
});