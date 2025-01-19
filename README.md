## Components

This library provides a wide range of UI components that you can import and use in your React projects.

### Layout Components

- **Scaffold**: A basic layout wrapper for a complete page.
- **Container**: A container component that adds padding and centers content.
- **Row**: A flex container for horizontal layout.
- **Column**: A flex container for vertical layout.
- **SizedBox**: A simple box to add fixed spacing.
- **SizedBox**: A simple box to add fixed spacing.
- **SizedBox**: A simple box to add fixed spacing.
- **Padding**: A component to add padding around its children.
- **Opacity**: A component to control the opacity of its children.
- **GestureDetector**: A component that listens for touch events.
- **Positioned**: A component for positioning an element within a parent.
- **PositionedFill**: A component that fills the entire space of its parent.

### Scroll Components

- **SingleChildScrollView**: A component to wrap a single child in a scrollable container.
- **ListView**: A basic scrollable list component.
- **ListViewBuilder**: A ListView with dynamic content rendered lazily.
- **ListViewSeperated**: A ListView with separators between items.
- **GridView**: A grid layout component.
- **GridViewBuilder**: A grid layout component with dynamic content.
- **GridViewCount**: A grid layout component with fixed number of columns.

### Form Components

- **TextField**: A text input field.
- **Switch**: A switch toggle for binary values.
- **TabBar**: A tab bar for navigation.
- **Divider**: A horizontal line separator.
- **OutlinedButton**: A button with an outlined style.
- **ElevatedButton**: A button with an elevated style.
- **CupertinoButton**: A button styled like iOS Cupertino buttons.

### Animation Components

- **Carousel**: A carousel component to display items in a sliding view.
- **RotatedBox**: A component to rotate its child by a certain angle.
- **Rotation**: A wrapper to animate rotation.
- **AnimatedOpacity**: A component that animates opacity changes.
- **AnimatedContainer**: A container component that animates size and other properties.
- **AnimatedRotation**: A component that animates the rotation of its child.
- **AnimatedScale**: A component that animates scaling of its child.
- **AnimatedSlide**: A component that animates sliding of its child.
- **Transform**: A wrapper to apply 2D and 3D transformations.
- **TransformRotate**: A component that rotates its child.
- **TransformScale**: A component that scales its child.
- **TransformTranslate**: A component that translates (moves) its child.
- **AspectRatio**: A component that adjusts its size to a specific aspect ratio.
- **FractionallySizedBox**: A box that sizes itself fractionally in its parent.

### Common UI Components

- **ClipRRect**: A component that clips its child with rounded corners.
- **Center**: A component that centers its child within the parent.
- **Align**: A component that aligns its child according to a specific alignment.
- **CircularProgressIndicator**: A circular loading spinner.
- **CircleAvatar**: A circular avatar component, typically used for profile pictures.
- **Reorderable**: A component that enables drag-and-drop reordering of items.
- **RichText**: A component for rendering styled text with mixed styles.
- **AppBar**: A standard app bar used in mobile applications.

## Usage

You can import and use these components in your React project as follows:

```tsx
import { TextField, Container, Row, Button } from "flutter_react_css";

const MyComponent = () => {
  return (
    <Container>
      <Row>
        <TextField placeholder="Enter text" />
        <Button>Submit</Button>
      </Row>
    </Container>
  );
};
```

## Example: Animated Components

Here's an example of how to use the `AnimatedOpacity` component:

```tsx
import { AnimatedOpacity } from "flutter_react_css";

const FadeInComponent = () => {
  return (
    <AnimatedOpacity from={0} to={1} duration={500}>
      <div>Faded In Content</div>
    </AnimatedOpacity>
  );
};
```

## Contributing

Feel free to open issues or pull requests if you want to contribute to the project. We're always open to suggestions, bug fixes, and new feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
