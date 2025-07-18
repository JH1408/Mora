import { useDeckStats } from '@/utils/hooks/useApi';

const DeckStats = ({ deckId }: { deckId: string }) => {
  const { data: deckStats } = useDeckStats(deckId);
  if (!deckStats) return null;
  return (
    <>
      <div className='flex justify-between text-sm text-text-secondary'>
        <span>{deckStats.deck.totalCards} cards</span>
        <span>{deckStats.deck.dueCards} cards ready for review</span>
      </div>
      <p className='text-xs text-text-muted'>
        Last studied:{' '}
        {deckStats.recentSessions[0].completedAt
          ? new Date(
              deckStats.recentSessions[0].completedAt
            ).toLocaleDateString()
          : 'Never'}
      </p>
    </>
  );
};

export default DeckStats;
