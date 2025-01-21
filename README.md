# 🚀 **Flutter React CSS Library**

Welcome to the **Flutter React CSS Library**, a collection of versatile UI components designed to bring the power of Flutter's layout and styling system into React! These components are flexible, modular, and easy to integrate into your React projects, enabling you to create responsive and dynamic user interfaces.

## 🎉 **What's New:**

- **New Components Added!**
  - 📝 **Text**: Easily display styled text in your app.
  - 🏃‍♂️ **AnimatedPadding**: Add animated padding transitions to your elements.
  - 📏 **ConstrainedBox**: Apply constraints to children (like width or height) within your layout.
  - ❌ **IgnorePointer**: Prevent user interactions with an element and its children.
- **RichText Enhancements!**
  - 🎨 Added more **style properties** to the **RichText** component for deeper customization of your text styling.
  - 📅 Added an **onEnd** callback to **AnimatedComponents** for handling animation completion.

---

## 🧩 **Components**

This library offers a wide variety of UI components, neatly categorized for easier integration into your projects:

### 🏗️ **Layout Components**

- **Scaffold**: A basic layout wrapper for a complete page.
- **Container**: A container component that adds padding and centers content.
- **Row**: A flex container for horizontal layout.
- **Column**: A flex container for vertical layout.
- **SizedBox**: A simple box to add fixed spacing.
- **Padding**: A component to add padding around its children.
- **Opacity**: A component to control the opacity of its children.
- **GestureDetector**: A component that listens for touch events.
- **Positioned**: A component for positioning an element within a parent container.
- **PositionedFill**: A component that positions an element to fill its parent container.
- **SingleChildScrollView**: A scrollable view for a single child.
- **ListView**: A scrolling container for a list of items.
- **ListViewBuilder**: A list that dynamically builds its items as needed.
- **ListViewSeperated**: A list with separated items.
- **GridView**: A grid-based layout for displaying items.
- **GridViewBuilder**: A grid layout that builds its items dynamically.
- **GridViewCount**: A grid layout with a fixed number of items per row.

### 📝 **Form Components**

- **TextField**: A text input field for user input.
- **Switch**: A switch that toggles between two states.
- **TabBar**: A component to display tabs for navigating between views.
- **OutlinedButton**: A button with an outlined border.
- **ElevatedButton**: A button with an elevated shadow.
- **CupertinoButton**: A button styled to follow Apple's design system.

### 🌈 **Visual Components**

- **Carousel**: A carousel component to display a collection of items.
- **RotatedBox**: A component that rotates its child.
- **Rotation**: A component to apply a rotation transformation to its child.
- **AnimatedOpacity**: An animated component for opacity transitions.
- **AnimatedContainer**: A container component with animated size, color, and other properties.
- **AnimatedRotation**: A component that applies an animated rotation.
- **AnimatedScale**: A component that applies an animated scaling effect.
- **AnimatedSlide**: A component that animates the sliding of an element.
- **AnimatedFractionallySizedBox**: A component that animates the resizing of its children based on a fraction of the parent container's width and height.
- **FittedBox**: A component that scales and positions its child according to the container.
- **Transform**: A component that applies transformations like rotate, scale, and translate.
- **TransformRotate**: A component that applies a rotation transformation.
- **TransformScale**: A component that applies a scaling transformation.
- **TransformTranslate**: A component that applies a translation transformation.
- **AspectRatio**: A component to enforce a specific aspect ratio for its child.
- **FractionallySizedBox**: A component that sizes its child based on a fraction of the parent container.

### 🔧 **Utility Components**

- **Divider**: A horizontal line used to separate content.
- **ClipRRect**: A component to clip its child with rounded corners.
- **Center**: A component that centers its child both vertically and horizontally.
- **Align**: A component that aligns its child within a container.
- **CircularProgressIndicator**: A spinner indicating loading or processing.
- **CircleAvatar**: A circular avatar image component.
- **Reorderable**: A component for reordering its children.
- **RichText**: A component to display styled text (now with more style options!).
- **Spacer**: A flexible spacer component that creates space between components.
- **Expanded**: A component that expands to fill available space.

### 📱 **App Components**

- **AppBar**: A top app bar typically used for navigation and actions.

---

### 🔥 **Example Usage:**

```tsx
import {
  Container,
  Row,
  Column,
  TextField,
  ElevatedButton,
  AnimatedPadding,
  RichText,
} from "flutter_react_css";

const MyApp = () => {
  return (
    <Scaffold>
      <Container>
        <Row>
          <Column>
            <TextField label="Enter your name" />
            <ElevatedButton onClick={() => alert("Button clicked!")}>
              Submit
            </ElevatedButton>
            <AnimatedPadding
              padding="10px"
              duration="1s"
              onEnd={() => alert("Animation Ended!")}
            >
              <Text>Animated Padding</Text>
            </AnimatedPadding>
            <RichText>
              <TextSpan
                text="Hello"
                textAlign="center"
                textDirection="ltr"
                textScaler={1.5}
                fontSize={20}
                fontWeight="bold"
                lineHeight="1.5"
                letterSpacing="0.5px"
                maxLines={2}
                color="blue"
                gradient={["red", "yellow", "blue"]}
                gradientAngle={45}
                onTap={() => alert("Text tapped!")}
              />
              <TextSpan
                text=" world!"
                style={{ color: "red" }}
                onTap={() => alert("World text tapped!")}
              />
            </RichText>
          </Column>
        </Row>
      </Container>
    </Scaffold>
  );
};
```

---

### ✨ **New Features at a Glance:**

- **Text** component added for easy inline text rendering.
- **AnimatedPadding** for smooth padding transitions with an `onEnd` callback! 🎉
- **ConstrainedBox** allows you to apply custom size constraints. 📏
- **IgnorePointer** to disable user interactions with specific elements. ❌
- **RichText** now supports more **style properties** for ultimate flexibility. 🎨
- **Animated Components** have an **onEnd** callback to handle animation completion. 📅
