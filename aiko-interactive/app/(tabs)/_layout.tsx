import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#d4af37',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarStyle: {
          backgroundColor: '#faf8f5',
          borderTopColor: '#e0e0e0',
        },
        headerStyle: {
          backgroundColor: '#faf8f5',
        },
        headerTintColor: '#2c3e50',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'AIKO',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
          headerTitle: 'AIKO - AI for Kids',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#2c3e50',
          },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null, // Hide this tab
        }}
      />
    </Tabs>
  );
}
