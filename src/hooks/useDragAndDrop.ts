import { useState, useRef, useEffect } from 'react';

interface UseDragAndDropProps {
  initialPosition: { x: number; y: number };
  onPositionChange?: (x: number, y: number) => void;
}

export function useDragAndDrop({ initialPosition, onPositionChange }: UseDragAndDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      
      // Constrain to reasonable bounds
      const constrainedX = Math.max(0, Math.min(newX, 600));
      const constrainedY = Math.max(0, Math.min(newY, 400));
      
      setPosition({ x: constrainedX, y: constrainedY });
      onPositionChange?.(constrainedX, constrainedY);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  return {
    position,
    isDragging,
    handleMouseDown,
    elementRef
  };
}