import { View, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

import { AuthContext } from '../../components/AuthContext';

const DrawerContent = (props) => {
  const [isDarktheme, setIsDarkTheme] = useState(false);
  const { signOut } = useContext(AuthContext);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarktheme);
  };

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.profileWrapper}>
              <Avatar.Image
                source={{
                  uri:
                    'https://media.istockphoto.com/vectors/creative-vector-illustration-of-default-avatar-profile-placeholder-vector-id1008665336?k=6&m=1008665336&s=170667a&w=0&h=OpZlqMZS7-FOVoMHM03KLa2_aWFvKXFliK2wh4J2XmE=',
                }}
                size={50}
              />
              <View style={styles.nameTagWrapper}>
                <Title style={styles.title}>Carlos Henrique</Title>
                <Caption style={styles.caption}>@chenoli</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  80
                </Paragraph>
                <Caption style={styles.caption2}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraph, styles.caption)}>
                  120
                </Paragraph>
                <Caption style={styles.caption2}>Followers</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate('Bookmarks');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarktheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  caption2: {
    fontSize: 14,
    lineHeight: 14,
    marginStart: 8,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  profileWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  nameTagWrapper: {
    flexDirection: 'column',
    marginLeft: 15,
  },
});

export default DrawerContent;
