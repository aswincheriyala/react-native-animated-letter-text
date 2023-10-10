# AnimatedText Component

The AnimatedText component adds captivating text and number animations to your React Native apps, perfect for dynamic interfaces like meter boards.

<img  src="https://firebasestorage.googleapis.com/v0/b/aswinc-90380.appspot.com/o/images%2Fanimated-text%2Fanimated-text-1.gif?alt=media"  width="300"  height="300" />

## Installation

```bash
npm install --save react-native-animated-text
```

## Usage

Once installed, you can import and use the `AnimatedText` component in your React Native application.

```javascript
import AnimatedColorView from "react-native-animated-text";
```

### Basic Usage

```jsx
import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import AnimatedText from "react-native-animated-text";

const App = () => {
  const [value, setValue] = useState(1); // The value you want to display

  return (
    <View style={styles.container}>
      <AnimatedText value={value} letterStyle={{ fontSize: 20 }} />
      <View style={styles.br} />
      <Button
        title="increment by 4"
        onPress={() => setValue((val) => val + 4)}
      />
      <View style={styles.br} />
      <Button
        title="decrement by 4"
        onPress={() => setValue((val) => val - 4)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  br: {
    height: 20,
  },
});

export default App;
```

## Properties

| Property                   | Description                                                                                                       | Type                 | Default     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `value`                    | The text or number to be displayed and animated.                                                                  | `string` or `number` | -           |
| `animationDirection`       | The direction of letter animation. Choose from: `'top-to-bottom'`, `'bottom-to-top'`, `'random'`, or `'default'`. | `string`             | `'default'` |
| `containerStyle`           | Additional styles for the container View.                                                                         | `ViewStyle`          | `{}`        |
| `letterStyle`              | Additional styles for each animated letter.                                                                       | `TextStyle`          | `{}`        |
| `translateValue`           | Adjust the translation distance for animation effect.                                                             | `number`             | `30`        |
| `isSameAnimationDelay`     | Set whether all letters have the same animation delay.                                                            | `boolean`            | `false`     |
| `disableEntryTranslation`  | Disable entry translation effect.                                                                                 | `boolean`            | `false`     |
| `disableExitTranslation`   | Disable exit translation effect.                                                                                  | `boolean`            | `false`     |
| `textVertical`             | Set text orientation to vertical.                                                                                 | `boolean`            | `false`     |
| `animateHorizontally`      | Enable horizontal animation.                                                                                      | `boolean`            | `false`     |
| `animateEntryHorizontally` | Enable horizontal entry animation.                                                                                | `boolean`            | `false`     |
| `animateExitHorizontally`  | Enable horizontal exit animation.                                                                                 | `boolean`            | `false`     |
| `flipLetter`               | Apply a letter flip effect.                                                                                       | `boolean`            | `false`     |
| `animateOnLoad`            | Enable animation when component loads.                                                                            | `boolean`            | `true`      |

## Advance Example

<img  src="https://firebasestorage.googleapis.com/v0/b/aswinc-90380.appspot.com/o/images%2Fanimated-text%2Fanimated-text-2.gif?alt=media"  width="300"  height="400" />

```javascript
import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import AnimatedText from "react-native-animated-text";
import Slider from "@react-native-community/slider";

export default function App() {
  const [value, setValue] = useState(188);

  const setRandomNumber = () => {
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setValue(randomNumber);
  };

  const setRandomWord = () => {
    const alphabet = "abcd";
    let randomWord = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomWord += alphabet[randomIndex];
    }
    setValue(randomWord);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          value:{" "}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{value}</Text>
        </Text>
        <View style={styles.row}>
          <Text>Different delay</Text>
          <AnimatedText
            value={value}
            containerStyle={styles.containerStyle}
            letterStyle={styles.letterStyle}
          />
        </View>
        <View style={styles.row}>
          <Text>Flip</Text>
          <AnimatedText
            value={value}
            letterStyle={styles.letterStyle}
            containerStyle={{ justifyContent: "center", marginVertical: 20 }}
            flipLetter
            animateOnLoad={false}
          />
        </View>
        <View style={styles.row}>
          <Text>Same delay</Text>
          <AnimatedText
            value={value}
            containerStyle={styles.containerStyle}
            letterStyle={styles.letterStyle}
            isSameAnimationDelay
          />
        </View>
        <View style={styles.row}>
          <Text>Vertical</Text>
          <AnimatedText
            value={value}
            containerStyle={{ alignSelf: "center", marginTop: 20 }}
            textVertical
            animateHorizontally
            isSameAnimationDelay
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View style={{ margin: 15 }}>
          <Button title="   -   " onPress={() => setValue((val) => val - 1)} />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 10 }}>
          <Button title="  +  " onPress={() => setValue((val) => val + 1)} />
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <Button title="random number" onPress={setRandomNumber} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Button title="random word" onPress={setRandomWord} />
      </View>
      <Slider
        style={{ height: 40, marginTop: 15 }}
        minimumValue={100}
        maximumValue={500}
        step={1}
        onValueChange={(val) => setValue(Math.floor(val))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  containerStyle: {
    backgroundColor: "lightgrey",
    padding: 10,
  },
  letterStyle: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 40,
    marginHorizontal: 3,
    height: 30,
    width: 30,
    textAlign: "center",
    textAlignVertical: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
```

## Props

The `AnimatedText` component accepts the following props:

- `value` (required): The value you want to display and animate.

- `animationDirection` (optional, default: `'default'`): The type of animation to use. It can be `'top-to-bottom'`, `'bottom-to-top'`, `'random'`, or `'default'`.

- `containerStyle` (optional): Additional styles to apply to the container View.

- `letterStyle` (optional): Additional styles to apply to each animated letter.

- `isSameAnimationDelay` (optional, default: `false`): If `true`, all letters will have the same animation delay. If `false`, letters will have random animation delays.

- `disableEntryTranslation` (optional, default: `false`): If `true`, entry translations will be disabled.

- `disableExitTranslation` (optional, default: `false`): If `true`, exit translations will be disabled.

- `textVertical` (optional, default: `false`): If `true`, the text orientation will be vertical; otherwise, it will be horizontal.

- `animateHorizontally` (optional, default: `false`): If `true`, horizontal animation will be enabled instead of vertical.

- `animateEntryHorizontally` (optional, default: `false`): If `true`, horizontal entry animation will be enabled instead of vertical.

- `animateExitHorizontally` (optional, default: `false`): If `true`, horizontal exit animation will be enabled instead of vertical.

- `translateValue` (optional, default: `30`): Adjust the translation distance for the animation effect.

- `flipLetter` (optional, default: `false`): If `true`, a letter flip effect will be applied for an additional animation dimension.

- `animateOnLoad` (optional, default: true): Enable animation when the component loads.

## Customization

You can customize the appearance of the animated text by providing styles through the `containerStyle` and `letterStyle` props.

<br />

## Copyright and License

ISC License

Copyright Aswin C. All rights reserved.
