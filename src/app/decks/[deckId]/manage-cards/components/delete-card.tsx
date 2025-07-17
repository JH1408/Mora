import { Card } from '@prisma/client';
import { Loader2, Trash2 } from 'lucide-react';

import { AlertDialog } from '@/components/ui/alert-dialog';
import { AlertDialogAction } from '@/components/ui/alert-dialog';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { AlertDialogContent } from '@/components/ui/alert-dialog';
import { AlertDialogDescription } from '@/components/ui/alert-dialog';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const DeleteCard = ({
  card,
  deleteCard,
  isDeletingCard,
}: {
  card: Card;
  deleteCard: (id: string) => void;
  isDeletingCard: boolean;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost-destructive' size='sm'>
          <Trash2 className='h-4 w-4 mr-1' />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Card</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this card? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant='ghost' size='sm' disabled={isDeletingCard}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant='destructive'
              onClick={() => deleteCard(card.id)}
              disabled={isDeletingCard}
              className='min-w-[80px]'
            >
              {isDeletingCard ? <Loader2 className='h-4 w-4 mr-1' /> : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCard;
