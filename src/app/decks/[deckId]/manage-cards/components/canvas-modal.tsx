import { Eraser, Pencil } from 'lucide-react';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';

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
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [color, setColor] = useState('#000000');
  const [isEraseMode, setIsEraseMode] = useState(false);
  const isSavingDrawing = false;
  const hasLoadedPaths = useRef(false);

  useEffect(() => {
    if (isOpen) {
      hasLoadedPaths.current = false;
    }
  }, [isOpen, handwritingData]);

  const handleClose = () => {
    onClose();
    setIsEraseMode(false);
    hasLoadedPaths.current = false;
  };

  const saveDrawing = async () => {
    const data = await canvasRef.current?.exportPaths();
    const json = JSON.stringify(data);
    const imageData = await canvasRef.current?.exportImage('png');
    console.log('saveDrawing', { imageData, data });
    if (!imageData || !data) {
      toast.error("Oops, we couldn't save this drawing. Please try again.");
      return;
    }
    onSave({ json, imageData });
    handleClose();
  };

  const handleCanvasRef = useCallback(
    (node: ReactSketchCanvasRef | null) => {
      if (node) {
        canvasRef.current = node;

        if (handwritingData && !hasLoadedPaths.current) {
          try {
            const parsed = JSON.parse(handwritingData);
            node.loadPaths(parsed);
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

  const cursor = !isEraseMode
    ? 'url(/images/pen.cur) 0 31, auto'
    : 'url(/images/eraser.cur) 0 31, auto';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md bg-background-white border-neutral-3 shadow-primary rounded-xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center space-x-2 font-heading'>
            <span className='text-text-primary'>Draw Handwritten Content</span>
          </DialogTitle>
        </DialogHeader>
        <ReactSketchCanvas
          width='100%'
          height='150px'
          canvasColor='transparent'
          strokeWidth={2}
          eraserWidth={10}
          strokeColor={color}
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: cursor,
          }}
          ref={handleCanvasRef}
        />
        <div className='flex items-center gap-4 ml-2 mt-2'>
          <PopoverColorPicker color={color} onChange={setColor} />
          <Button
            variant={isEraseMode ? 'soft-accent' : 'soft-secondary'}
            onClick={() => {
              setIsEraseMode(!isEraseMode);
              canvasRef.current?.eraseMode(isEraseMode ? false : true);
            }}
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
        </div>

        <div className='flex space-x-2'>
          <Button
            type='button'
            variant='ghost'
            onClick={handleClose}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            type='button'
            className='flex-1'
            disabled={isSavingDrawing}
            onClick={saveDrawing}
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
