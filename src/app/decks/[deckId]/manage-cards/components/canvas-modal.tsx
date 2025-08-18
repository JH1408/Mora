import { Eraser, Pencil, Redo, Undo } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';

import useCanvas from '../hooks/use-canvas';

import PopoverColorPicker from './popover-color-picker';

const CanvasModal = ({
  isOpen,
  onClose,
  onSave,
  handwritingData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { json: string; imageData: string }) => void;
  handwritingData: string | null;
}) => {
  const {
    setColor,
    setIsEraseMode,
    isEraseMode,
    color,
    resetCanvas,
    saveDrawing,
    hasLoadedPaths,
    handleCanvasRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    undo,
    redo,
    undoDisabled,
    redoDisabled,
  } = useCanvas(handwritingData);
  const [isSavingDrawing, setIsSavingDrawing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      hasLoadedPaths.current = false;
    }
  }, [isOpen, handwritingData, hasLoadedPaths]);

  const handleOnClose = () => {
    resetCanvas();
    onClose();
  };

  const handleOnSave = async () => {
    setIsSavingDrawing(true);
    const drawingData = saveDrawing();
    setIsSavingDrawing(false);
    if (!drawingData) {
      return;
    }
    onSave(drawingData);
    handleOnClose();
  };

  const cursor = !isEraseMode
    ? 'url(/images/pen.cur) 0 31, auto'
    : 'url(/images/eraser.cur) 0 31, auto';

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className='sm:max-w-2xl md:max-w-4xl bg-background-white border-neutral-3 shadow-primary rounded-xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2 font-heading'>
            <span className='text-text-primary'>Draw Handwritten Content</span>
          </DialogTitle>
          <DialogDescription className='text-text-muted hidden'>
            Use your mouse, touch or stylus to draw handwritten content for your
            flashcard.
          </DialogDescription>
        </DialogHeader>
        <canvas
          ref={handleCanvasRef}
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: cursor,
            width: '100%',
            height: '300px',
            touchAction: 'none',
          }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        />
        <div className='flex items-center gap-4 ml-2 mt-2'>
          <PopoverColorPicker
            color={color}
            onChange={(color) => setColor(color)}
          />
          <Button
            variant={isEraseMode ? 'soft-accent' : 'soft-secondary'}
            onClick={() => setIsEraseMode(!isEraseMode)}
            title={isEraseMode ? 'Switch to Draw' : 'Switch to Erase'}
          >
            {isEraseMode ? (
              <span className='flex items-center gap-2'>
                <Pencil className='h-5 w-5' /> Draw
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                <Eraser className='h-5 w-5' /> Erase
              </span>
            )}
          </Button>
          <Button
            variant='ghost'
            disabled={undoDisabled}
            onClick={() => undo()}
          >
            <Undo className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            disabled={redoDisabled}
            onClick={() => redo()}
          >
            <Redo className='h-5 w-5' />
          </Button>
          <Button
            variant='ghost'
            disabled={undoDisabled}
            onClick={() => resetCanvas()}
          >
            Reset
          </Button>
        </div>

        <div className='flex space-x-2 sm:w-1/2 sm:ml-auto'>
          <Button
            type='button'
            variant='ghost'
            onClick={handleOnClose}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            type='button'
            className='flex-1'
            disabled={isSavingDrawing}
            onClick={handleOnSave}
          >
            {isSavingDrawing ? (
              <Spinner className='w-4 h-4 border-white' />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CanvasModal;
