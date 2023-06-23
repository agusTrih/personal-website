import { ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';

/**
 * The function exports a React component that uses the RoughNotation library to create a rainbow
 * highlight effect on a given text.
 * @param {RainbowHighlightProps}  - - `RainbowHighlightProps`: an interface defining the props for the
 * `RainbowHighlight` component
 * @returns The `RainbowHighlight` component is being returned. It takes in two props: `color` and
 * `children`. It uses the `RoughNotation` component from the `react-rough-notation` library to create
 * a highlight effect on the `children` prop with the specified `color`. The `animationDuration` is
 * calculated based on the length of the `children` prop. The
 */

interface HighlightProps {
  color?: string;
  children: string;
  type?:
    | 'underline'
    | 'box'
    | 'circle'
    | 'highlight'
    | 'strike-through'
    | 'crossed-off'
    | 'bracket';
  strokeWidth?: number;
}

export function Highlight({
  color,
  children,
  strokeWidth = 2,
  type = 'highlight',
}: HighlightProps) {
  const animationDuration = Math.floor(30 * children.length);
  return (
    <RoughNotation
      type={type}
      multiline={true}
      padding={[0, 5]}
      iterations={1}
      animationDuration={animationDuration}
      color={color}
      strokeWidth={strokeWidth}
      show
    >
      {children}
    </RoughNotation>
  );
}
