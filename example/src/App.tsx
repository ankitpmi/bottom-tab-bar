import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { TabBar, type TabsType } from '@mindinventory/react-native-tab-bar-interaction';
import LottieView from 'lottie-react-native';

const { width: screenWidth } = Dimensions.get('window');

const lottieIconStyle = {
  width: 30,
  height: 30,
};

const activeHome = (isPlay: boolean) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView
        source={require(`../assets/bar.json`)}
        autoPlay={isPlay}
        loop={false}
        style={lottieIconStyle}
      />
    </View>
  );
};

const activeList = (isPlay: boolean) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView
        source={require(`../assets/cart.json`)}
        autoPlay={isPlay}
        loop={false}
        style={lottieIconStyle}
      />
    </View>
  );
};

const activeSearch = (isPlay: boolean) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView
        source={require(`../assets/search.json`)}
        autoPlay={isPlay}
        loop={false}
        style={lottieIconStyle}
      />
    </View>
  );
};

interface TabsDataType extends TabsType {
  activeTintColor: string;
}
const tabData: Array<TabsDataType> = [
  {
    name: 'Home',
    activeTintColor: '#FFC0C7',
    activeIcon: activeHome(true),
    inactiveIcon: activeHome(false),
  },
  {
    name: 'Cart',
    activeTintColor: '#FF7128',
    activeIcon: activeList(true),
    inactiveIcon: activeList(false),
  },
  {
    name: 'Search',
    activeTintColor: '#0088cc',
    activeIcon: activeSearch(true),
    inactiveIcon: activeSearch(false),
  }, 
];

export default function App() {
  const tabs = useMemo(() => tabData, []);
  const flatListRef = useRef<FlatList>(null);

  const onTabChange = useCallback((_item: TabsType, index: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={tabs}
        keyExtractor={(item) => item.name}
        renderItem={({ item }: { item: TabsDataType }) => {
          return (
            <View
              style={[
                styles.slide,
                {
                  backgroundColor: item.activeTintColor,
                },
              ]}
            >
              <Text>{item.name}</Text>
            </View>
          );
        }}
        scrollEnabled={false}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <TabBar
        tabs={tabs as Array<TabsType>}
        onTabChange={onTabChange}
        containerWidth={screenWidth - 30}        
        containerBottomSpace={30}        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
