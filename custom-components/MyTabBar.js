import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import HomeIcon from '../assets/icons/home1.svg'
import { darkTheme } from '../utils/Theme';

const iconMap = {
    Keşfet: 'location-arrow',
    Komünite: 'people-group',
    Planlar: 'clipboard-list',
    Profil: 'circle-user'
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (

            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            > 
              <Text style={styles.text}>
                <Icon name={iconMap[route.name]} size={26} color={isFocused ? styles.textFocused.color : styles.text.color} />
              </Text>
              <Text style={isFocused ? styles.textFocused : styles.text}>
                {label}
              </Text>
            </TouchableOpacity>
          
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical:8,
    
  },
  textFocused: {
    color: darkTheme.primary,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Lexend-Light'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Lexend-Light'
  }
})

export default MyTabBar;