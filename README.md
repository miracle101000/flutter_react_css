You can update the README to reflect the newly added components with the appropriate examples. Here's an enhanced version of your README, including the new components:

---

# Flutter React CSS

**Flutter React CSS** is a React component library that provides a set of flexible and customizable UI components similar to Flutter's layout and widget system. The library includes a variety of layout components, animations, and utilities to help developers build modern and responsive UIs quickly and efficiently using React.

## Installation

To install **Flutter React CSS**, run the following command:

```bash
npm install flutter-react-css
```

or

```bash
yarn add flutter-react-css
```

## Usage

Once installed, you can import and use the components in your React application.

```tsx
import { Scaffold, Container, Row, Column, SizedBox } from "flutter-react-css";
```

### Available Components

Below is a list of the components available in this library, along with descriptions and example usage.

---

### 1. `Scaffold`

A `Scaffold` provides the basic structure for an app's UI. It allows for the inclusion of AppBar, body content, floating action buttons, and more.

```tsx
import { Scaffold } from "flutter-react-css";

const MyApp = () => (
  <Scaffold
    appBar={{ title: "My App" }}
    body={<div>Content goes here</div>}
    floatingActionButton={<button>+</button>}
  />
);
```

### 2. `Container`

A flexible container for layout and styling with support for gradients, padding, margins, borders, and more.

```tsx
import { Container } from "flutter-react-css";

const MyComponent = () => (
  <Container
    padding={20}
    margin={10}
    backgroundColor="lightblue"
    borderRadius={10}
    shadow="md"
    width="300px"
    height="200px"
  >
    <h1>Hello World</h1>
  </Container>
);
```

### 3. `Row`

A component that arranges its children in a horizontal layout.

```tsx
import { Row } from "flutter-react-css";

const MyComponent = () => (
  <Row justifyContent="space-between" alignItems="center">
    <div>Item 1</div>
    <div>Item 2</div>
  </Row>
);
```

### 4. `Column`

A component that arranges its children in a vertical layout.

```tsx
import { Column } from "flutter-react-css";

const MyComponent = () => (
  <Column alignItems="center" justifyContent="center">
    <div>Item 1</div>
    <div>Item 2</div>
  </Column>
);
```

### 5. `SizedBox`

A box that provides fixed dimensions of space, either horizontally or vertically.

```tsx
import { SizedBox } from "flutter-react-css";

const MyComponent = () => (
  <div>
    <div>Item 1</div>
    <SizedBox height={20} />
    <div>Item 2</div>
  </div>
);
```

### 6. `Padding`

A component that adds padding around its children.

```tsx
import { Padding } from "flutter-react-css";

const MyComponent = () => (
  <Padding padding={20}>
    <div>Content inside padding</div>
  </Padding>
);
```

### 7. `Opacity`

A component that adjusts the opacity of its children.

```tsx
import { Opacity } from "flutter-react-css";

const MyComponent = () => (
  <Opacity opacity={0.5}>
    <div>Content with reduced opacity</div>
  </Opacity>
);
```

### 8. `GestureDetector`

A component that detects gestures such as taps and swipes.

```tsx
import { GestureDetector } from "flutter-react-css";

const MyComponent = () => (
  <GestureDetector onTap={() => alert("Tapped!")}>
    <div>Click Me</div>
  </GestureDetector>
);
```

### 9. `Positioned`

A component that allows you to position its children absolutely inside a parent container.

```tsx
import { Positioned } from "flutter-react-css";

const MyComponent = () => (
  <div style={{ position: "relative", height: "200px" }}>
    <Positioned top={10} left={10}>
      <div>Positioned content</div>
    </Positioned>
  </div>
);
```

### 10. `SinglechildScrollView`

A wrapper for single child content that enables scrolling.

```tsx
import { SinglechildScrollView } from "flutter-react-css";

const MyComponent = () => (
  <SinglechildScrollView>
    <div>Scrollable content</div>
  </SinglechildScrollView>
);
```

### 11. `ListView` / `ListViewBuilder` / `ListViewSeperated`

These components provide a list view with different configurations.

```tsx
import {
  ListView,
  ListViewBuilder,
  ListViewSeperated,
} from "flutter-react-css";

const MyComponent = () => (
  <ListView
    items={["Item 1", "Item 2", "Item 3"]}
    renderItem={(item) => <div>{item}</div>}
  />
);
```

### 12. `GridView`, `GridViewBuilder`, `GridViewCount`

These components enable grid-based layouts.

```tsx
import { GridView } from "flutter-react-css";

const MyComponent = () => (
  <GridView
    columns={3}
    items={["Item 1", "Item 2", "Item 3"]}
    renderItem={(item) => <div>{item}</div>}
  />
);
```

### 13. `TextField`

A customizable input field.

```tsx
import { TextField } from "flutter-react-css";

const MyComponent = () => (
  <TextField label="Name" placeholder="Enter your name" />
);
```

### 14. `Carousel`

A carousel component for rotating through content (images, cards, etc.).

```tsx
import { Carousel } from "flutter-react-css";

const MyComponent = () => (
  <Carousel
    height="400px"
    aspectRatio={1.5}
    initialPage={0}
    autoPlay={true}
    autoPlayInterval={3000}
    onPageChanged={(index) => console.log("Page changed to:", index)}
  >
    <img src="slide1.jpg" alt="Slide 1" />
    <img src="slide2.jpg" alt="Slide 2" />
    <img src="slide3.jpg" alt="Slide 3" />
  </Carousel>
);
```

### 15. `RotatedBox`

A box that allows rotation of its content.

```tsx
import { RotatedBox } from "flutter-react-css";

const MyComponent = () => (
  <RotatedBox turns={2}>
    <div>Rotated content</div>
  </RotatedBox>
);
```

### 16. `AnimatedRotation`, `AnimatedOpacity`, `AnimatedContainer`

These components provide animation capabilities for rotating, fading, and container-based transformations.

```tsx
import {
  AnimatedContainer,
  AnimatedOpacity,
  AnimatedRotation,
} from "flutter-react-css";

const MyComponent = () => (
  <AnimatedContainer duration={500} padding={20} backgroundColor="lightblue">
    <div>Animated content</div>
  </AnimatedContainer>
);
```

### 17. `FittedBox`

A box that scales its child to fit within the available space.

```tsx
import { FittedBox } from "flutter-react-css";

const MyComponent = () => (
  <FittedBox>
    <div>Fitted content</div>
  </FittedBox>
);
```

### 18. `Transform`

A container for transforming its children (rotate, scale, etc.).

```tsx
import { Transform } from "flutter-react-css";

const MyComponent = () => (
  <Transform rotate={45} scale={1.5}>
    <div>Transformed content</div>
  </Transform>
);
```

### 19. `AspectRatio`

A component that maintains a specific aspect ratio for its children.

```tsx
import { AspectRatio } from "flutter-react-css";

const MyComponent = () => (
  <AspectRatio ratio={16 / 9}>
    <div>Content with aspect ratio</div>
  </AspectRatio>
);
```

### 20. `FractionallySizedBox`

A component that sizes its child based on a fraction of the parent's size.

```tsx
import { FractionallySizedBox } from "flutter-react-css";

const MyComponent = () => (
  <FractionallySizedBox widthFactor={0.5} heightFactor={0.5}>
    <div>Fractional sized content</div>
  </FractionallySizedBox>
);
```

### 21. `TabBar`

A tab bar component for navigation.

```tsx
import { TabBar } from "flutter-react-css";

const MyComponent = () => <TabBar tabs={["Tab 1", "Tab 2", "Tab 3"]} />;
```

### 22. `Switch`

A toggle switch component.

```tsx
import { Switch } from "flutter-react-css";

const MyComponent = () => (
  <Switch checked={true} onChange={(e) => console.log(e.target.checked)} />
);
```

### 23. `Divider`

A divider to separate content.

```tsx
import { Divider } from "flutter-react-css";

const MyComponent = () => (
  <div>
    <div>Item 1</div>
    <Divider />
    <div>Item 2</div>
  </div>
);
```

### 24. `ClipRRect`

A component that rounds the corners of its child.

```tsx
import { ClipRRect } from "flutter-react-css";

const MyComponent = () => (
  <ClipRRect radius={10}>
    <div>Content with rounded corners</div>
  </ClipRRect>
);
```

### 25. `CircularProgressIndicator`

A loading indicator.

```tsx
import { CircularProgressIndicator } from "flutter-react-css";

const MyComponent = () => <CircularProgressIndicator />;
```

---

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository, create a new branch, and submit a pull request.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This update should make the README comprehensive and user-friendly, providing examples and details on the new components.
