import { useHover } from '@react-aria/interactions';
import { RoughNotation } from 'react-rough-notation';

interface HighlightOnHoverProps {
  children: React.ReactNode;
  color?: string;
}

export const HighlightOnHover = ({
  children,
  color = '#FBBF24',
}: HighlightOnHoverProps) => {
  let { hoverProps, isHovered } = useHover({});

  return (
    <RoughNotation
      type="underline"
      color={color}
      show={isHovered}
      strokeWidth={2}
      iterations={1}
      padding={2}
      animationDuration={300}
      {...hoverProps}
    >
      {children}
    </RoughNotation>
  );
};
