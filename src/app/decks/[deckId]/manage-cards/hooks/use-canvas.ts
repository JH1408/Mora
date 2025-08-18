import { getStroke } from 'perfect-freehand';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

export const useCanvas = (handwritingData: string | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [isEraseMode, setIsEraseMode] = useState(false);

  const hasLoadedPaths = useRef(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const drawStroke = useCallback((stroke: Stroke) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (stroke.points.length < 2) return;

    const outlinePoints = getStroke(stroke.points, {
      size: stroke.width,
      thinning: 0.1,
      smoothing: 0.8,
      streamline: 0.8,
      simulatePressure: false,
    });

    if (outlinePoints.length === 0) return;

    // Create path data string for Path2D
    let pathData = `M ${outlinePoints[0][0]} ${outlinePoints[0][1]}`;

    for (let i = 1; i < outlinePoints.length; i++) {
      pathData += ` L ${outlinePoints[i][0]} ${outlinePoints[i][1]}`;
    }

    pathData += ' Z'; // Close the path

    // Create Path2D object for better performance
    const myPath = new Path2D(pathData);

    if (stroke.isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill(myPath);
      ctx.globalCompositeOperation = 'source-over';
    } else {
      ctx.fillStyle = stroke.color;
      ctx.fill(myPath);
    }
  }, []);

  useEffect(() => {
    clearCanvas();
    strokes.forEach(drawStroke);
  }, [strokes, drawStroke]);

  const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Calculate position relative to the canvas element
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { x, y };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = getCanvasPoint(e);

    const newStroke: Stroke = {
      id: Date.now().toString(),
      points: [point],
      color: color,
      width: isEraseMode ? 20 : 2,
      isEraser: isEraseMode,
    };

    setCurrentStroke(newStroke);
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !currentStroke) return;

    const point = getCanvasPoint(e);
    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, point],
    };

    setCurrentStroke(updatedStroke);
    drawStroke(updatedStroke);
  };

  const handlePointerUp = () => {
    if (currentStroke) {
      setStrokes((prev) => [...prev, currentStroke]);
      setRedoStrokes([]);
      setCurrentStroke(null);
    }
    setIsDrawing(false);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error("Oops, we couldn't save this drawing. Please try again.");
      return;
    }

    const imageData = canvas.toDataURL('image/png');
    const json = JSON.stringify(strokes);
    return { imageData, json };
  };

  const initializeCanvas = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node) {
        canvasRef.current = node;

        // Set canvas size with high DPI support
        const rect = node.getBoundingClientRect();
        const devicePixelRatio = window.devicePixelRatio || 1;
        node.width = rect.width * devicePixelRatio;
        node.height = rect.height * devicePixelRatio;

        const ctx = node.getContext('2d');
        if (ctx) {
          ctx.scale(devicePixelRatio, devicePixelRatio);
        }

        if (handwritingData && !hasLoadedPaths.current) {
          try {
            const parsed = JSON.parse(handwritingData);
            setStrokes(parsed);
            hasLoadedPaths.current = true;
          } catch (error) {
            toast.error(
              "Oops, we couldn't load this drawing. Please try again."
            );
            console.error('Failed to load drawing data:', error);
            hasLoadedPaths.current = true;
          }
        }
      }
    },
    [handwritingData]
  );

  const resetCanvas = () => {
    setIsEraseMode(false);
    hasLoadedPaths.current = false;
    setStrokes([]);
    setCurrentStroke(null);
    setIsDrawing(false);
  };

  const undo = () => {
    if (!strokes.length) return;
    setRedoStrokes((prevRedoStrokes) => [
      ...prevRedoStrokes,
      strokes[strokes.length - 1],
    ]);
    setStrokes((prevStrokes) => prevStrokes.slice(0, -1));
  };
  const redo = () => {
    if (!redoStrokes.length) return;
    setStrokes((prevStrokes) => [
      ...prevStrokes,
      redoStrokes[redoStrokes.length - 1],
    ]);
    setRedoStrokes((prevRedoStrokes) => prevRedoStrokes.slice(0, -1));
  };

  return {
    setColor,
    setIsEraseMode,
    isEraseMode,
    color,
    canvasRef,
    resetCanvas,
    saveDrawing,
    hasLoadedPaths,
    handleCanvasRef: initializeCanvas,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    undo,
    redo,
    undoDisabled: !strokes.length,
    redoDisabled: !redoStrokes.length,
  };
};

export default useCanvas;
