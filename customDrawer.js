import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, StyleSheet, Linking } from 'react-native'

export default function Sidebar ({ ...props }) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View>
        <DrawerItemList {...props} />
      </View>

      <View>
        <DrawerItem
          label='Follow us'
          labelStyle={styles.drawerSubHeader}
          icon={({ color, size }) => {
            return <Ionicons name='logo-github' size={size} color={color} />
          }}
        ></DrawerItem>
        <DrawerItem
          label='Yoona Kim'
          labelStyle={styles.drawerCallout}
          onPress={() => Linking.openURL('https://github.com/kim00432')}
          icon={({ color, size }) => {
            return <Ionicons name='open-outline' size={size} color={color} />
          }}
        ></DrawerItem>
        <DrawerItem
          label='JC Castagne'
          labelStyle={styles.drawerCallout}
          onPress={() => Linking.openURL('https://github.com/jccastagne')}
          icon={({ color, size }) => {
            return <Ionicons name='open-outline' size={size} color={color} />
          }}
        ></DrawerItem>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 48
  },
  drawerSubHeader: {
    fontWeight: '600',
    fontSize: 20,
    opacity: 0.75
  },
  drawerCallout: {
    opacity: 0.75
  }
})
