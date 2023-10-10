import {View, Animated, ViewStyle, TextStyle} from 'react-native';
import React, {useEffect, useRef} from 'react';

interface AnimatedTextProps {
  value: string | number;
  animationDirection: 'top-to-bottom' | 'bottom-to-top' | 'random' | 'default';
  containerStyle: ViewStyle;
  letterStyle: TextStyle;
  translateValue: number;
  isSameAnimationDelay: boolean;
  disableEnrtyTranslation: boolean;
  disableExitTranslation: boolean;
  textVertical: boolean;
  animateHorizontally: boolean;
  animateEntryHorizontally: boolean;
  animateExitHorizontally: boolean;
  flipLetter: boolean;
  animateOnLoad: boolean;
}

function _AnimatedText({
  value,
  animationDirection = 'default',
  containerStyle = {},
  letterStyle = {},
  isSameAnimationDelay = false,
  disableEnrtyTranslation = false,
  disableExitTranslation = false,
  textVertical = false,
  animateHorizontally = false,
  animateEntryHorizontally = false,
  animateExitHorizontally = false,
  translateValue = 30,
  flipLetter = false,
  animateOnLoad = true,
}: AnimatedTextProps) {
  const _value = value.toString().split('');
  const prevValue = useRef(value);
  let fromTop: boolean;
  switch (animationDirection) {
    case 'top-to-bottom':
      fromTop = true;
      break;
    case 'bottom-to-top':
      fromTop = false;
      break;
    case 'random':
      fromTop = Math.random() < 0.5;
      break;
    default:
      fromTop = prevValue.current <= value;
      break;
  }
  prevValue.current = value;
  delete containerStyle.flexDirection;
  delete letterStyle.opacity;
  delete letterStyle.transform;
  return (
    <Animated.View
      style={[
        {flexDirection: textVertical ? 'column' : 'row'},
        containerStyle,
      ]}>
      {_value.map((letter: any, index: number) => (
        <View key={index}>
          <AnimatedLetter
            letter={letter}
            fromTop={fromTop}
            removal={false}
            style={letterStyle}
            isSameAnimationDelay={isSameAnimationDelay}
            disableEnrtyTranslation={disableEnrtyTranslation}
            disableExitTranslation={disableExitTranslation}
            animateHorizontally={animateHorizontally}
            animateEntryHorizontally={animateEntryHorizontally}
            animateExitHorizontally={animateExitHorizontally}
            translateValue={translateValue}
            flipLetter={flipLetter}
            animateOnLoad={animateOnLoad}
          />
          <View style={{position: 'absolute'}}>
            <AnimatedLetter
              letter={letter}
              fromTop={fromTop}
              removal={true}
              style={letterStyle}
              isSameAnimationDelay={isSameAnimationDelay}
              disableEnrtyTranslation={disableEnrtyTranslation}
              disableExitTranslation={disableExitTranslation}
              animateHorizontally={animateHorizontally}
              animateEntryHorizontally={animateEntryHorizontally}
              animateExitHorizontally={animateExitHorizontally}
              translateValue={translateValue}
              flipLetter={flipLetter}
              animateOnLoad={animateOnLoad}
            />
          </View>
        </View>
      ))}
    </Animated.View>
  );
}

function getRandomDelay() {
  const min = 0;
  const max = 200;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function AnimatedLetter({
  letter,
  fromTop,
  removal,
  style,
  isSameAnimationDelay,
  disableEnrtyTranslation,
  disableExitTranslation,
  animateHorizontally,
  animateEntryHorizontally,
  animateExitHorizontally,
  translateValue,
  flipLetter,
  animateOnLoad,
}: {
  letter: any;
  fromTop: any;
  removal: any;
  style: any;
  isSameAnimationDelay: boolean;
  disableEnrtyTranslation: boolean;
  disableExitTranslation: boolean;
  animateHorizontally: boolean;
  animateEntryHorizontally: boolean;
  animateExitHorizontally: boolean;
  translateValue: number;
  flipLetter: boolean;
  animateOnLoad: boolean;
}) {
  const currentAnimatedValue = useRef(new Animated.Value(0)).current;
  const currentTranslate = currentAnimatedValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-translateValue, 0, translateValue],
  });
  const currentOpacity = currentAnimatedValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 1, 0],
  });
  const currentRotate = currentAnimatedValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-90deg', '0deg', '90deg'],
  });

  const prevAnimatedValue = useRef(new Animated.Value(1)).current;
  const prevTranslate = prevAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, fromTop ? translateValue : -translateValue],
  });
  const prevOpacity = prevAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const prevRotate = prevAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const prevProps = useRef(letter);

  if (prevProps.current !== letter) {
    prevAnimatedValue.setValue(0);
    currentAnimatedValue.setValue(fromTop ? -1 : 1);
  }

  useEffect(() => {
    if (animateOnLoad) {
      currentAnimatedValue.setValue(fromTop ? -1 : 1);
      Animated.spring(currentAnimatedValue, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        delay: flipLetter ? 250 : isSameAnimationDelay ? 0 : getRandomDelay(),
      }).start();
    }
  }, []);

  useEffect(() => {
    if (prevProps.current !== letter) {
      currentAnimatedValue.setValue(fromTop ? -1 : 1);
      Animated.spring(currentAnimatedValue, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        delay: flipLetter ? 250 : isSameAnimationDelay ? 0 : getRandomDelay(),
      }).start();
      prevAnimatedValue.setValue(0);
      Animated.spring(prevAnimatedValue, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    }
    prevProps.current = letter;
  }, [letter]);

  return !removal ? (
    <Animated.Text
      style={{
        ...(disableEnrtyTranslation || flipLetter
          ? {}
          : {
              transform: [
                animateHorizontally || animateEntryHorizontally
                  ? {translateX: currentTranslate}
                  : {translateY: currentTranslate},
              ],
            }),
        ...(flipLetter ? {transform: [{rotateX: currentRotate}]} : {}),
        opacity: currentOpacity,
        ...style,
      }}>
      {letter}
    </Animated.Text>
  ) : (
    <Animated.Text
      style={{
        ...(disableExitTranslation || flipLetter
          ? {}
          : {
              transform: [
                animateHorizontally || animateExitHorizontally
                  ? {translateX: prevTranslate}
                  : {translateY: prevTranslate},
              ],
            }),
        ...(flipLetter ? {transform: [{rotateX: prevRotate}]} : {}),
        opacity: prevOpacity,
        ...style,
      }}>
      {prevProps.current}
    </Animated.Text>
  );
}

const AnimatedText = React.memo(
  _AnimatedText,
  (prevProps: AnimatedTextProps, nextProps: AnimatedTextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.animationDirection === nextProps.animationDirection &&
    prevProps.translateValue === nextProps.translateValue &&
    prevProps.isSameAnimationDelay === nextProps.isSameAnimationDelay &&
    prevProps.disableEnrtyTranslation === nextProps.disableEnrtyTranslation &&
    prevProps.disableExitTranslation === nextProps.disableExitTranslation &&
    prevProps.animateHorizontally === nextProps.animateHorizontally &&
    prevProps.animateEntryHorizontally === nextProps.animateEntryHorizontally &&
    prevProps.animateExitHorizontally === nextProps.animateExitHorizontally &&
    prevProps.flipLetter === nextProps.flipLetter &&
    prevProps.animateOnLoad === nextProps.animateOnLoad,
);

export default AnimatedText;
