import React, { useCallback } from "react";
import { Alert, Linking, StyleSheet, View, Text, Image  } from "react-native";
import { ThemeProvider, Button, Card, Icon, ListItem } from 'react-native-elements';

const OpenURLButton = ({ url, color, icon, size, text_color, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
        icon ?
        <Button
            buttonStyle={{backgroundColor: `${color}`, borderRadius: 10}}
            icon={
                icon ?
                 <Icon
                    iconStyle={{marginRight: 5}}
                    name={`${icon}`}
                    type='font-awesome'
                    size={size}
                    color={`${text_color}`}
                /> : undefined
                
            }
            title={children}
            onPress={handlePress}
        /> : 
            null
        
  );
};

export default OpenURLButton;