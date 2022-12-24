import { View, Text, Dimensions, Animated, Easing } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const DURATION = 2000;
const WIDTH = Dimensions.get("screen").width;
const START = -1;
const END = 1;
const LOCATION = [0.3, 0.5, 0.7];
const COLOR = ["#eee", "#ddd", "#eee"];
const ANIMATION = new Animated.Value(START);

const runAnimation = () => {
  ANIMATION.setValue(START);
  Animated.timing(ANIMATION, {
    toValue: END,
    duration: DURATION,
    easing: Easing.linear(),
    useNativeDriver: true,
  }).start(runAnimation);
};

const linear = ANIMATION.interpolate({
  inputRange: [START, END],
  outputRange: [-WIDTH, WIDTH],
});

runAnimation();

export default function Skeleton({ width, height }) {
  const [positionX, setPositionX] = React.useState([]);
  let viewRef = null;
  return (
    <View
      style={{
        backgroundColor: "#eee",
        overflow: "hidden",
        width,
        height,
        borderRadius: 10,
      }}
      ref={(ref) => (viewRef = ref)}
      onLayout={() => {
        if (viewRef) {
          viewRef.measure((_x, _y, _width, _height, pageX, _pageY) => {
            setPositionX(pageX);
          });
        }
      }}
    >
      {positionX !== null && (
        <Animated.View
          style={{
            left: -positionX,
            flex: 1,
            transform: [
              {
                translateX: linear,
              },
            ],
          }}
        >
          <LinearGradient
            colors={COLOR}
            locations={LOCATION}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: WIDTH,
              flex: 1,
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}
