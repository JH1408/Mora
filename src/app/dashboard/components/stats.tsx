import { BookOpen, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface StatData {
  bgClass: string;
  shadowClass: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  value: number | null;
  subtitle?: React.ReactNode;
  button?:
    | ((setIsCreateModalOpen: (isOpen: boolean) => void) => React.ReactNode)
    | React.ReactNode;
}

const getStatsData = (
  languagesCount: number,
  deckCount: number
): StatData[] => [
  {
    bgClass: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
    shadowClass: 'shadow-secondary',
    icon: <BookOpen className='h-8 w-8 text-primary-100' />,
    title: 'Total Decks',
    value: deckCount,
  },
  {
    bgClass: 'bg-gradient-to-r from-primary-600 to-primary-700',
    shadowClass: 'shadow-primary',
    icon: <Plus className='h-6 w-6 text-primary-100' />,
    title: 'Create New Deck',
    value: null,
    subtitle: 'Start Learning Today',
    button: (setIsCreateModalOpen: (isOpen: boolean) => void) => (
      <Button
        onClick={() => setIsCreateModalOpen(true)}
        size='sm'
        className='w-full bg-white/20 hover:bg-white/30 text-white border-0'
      >
        Create Deck
      </Button>
    ),
  },
  {
    bgClass: 'bg-gradient-to-r from-accent-500 to-accent-600',
    shadowClass: 'shadow-accent',
    icon: <div className='h-8 w-8 text-accent-200 text-xl font-bold'>🌍</div>,
    title: 'Languages',
    value: languagesCount,
  },
];

const Stats = ({
  setIsCreateModalOpen,
  languagesCount,
  deckCount,
}: {
  setIsCreateModalOpen: (isOpen: boolean) => void;
  languagesCount: number;
  deckCount: number;
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      {getStatsData(languagesCount, deckCount).map((stat, index) => (
        <Card
          key={`stat-${index}`}
          className={`${stat.bgClass} ${stat.shadowClass} text-white border-0`}
        >
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-primary-100 text-sm'>{stat.title}</p>
                {stat.subtitle && (
                  <p className='text-lg font-medium'>{stat.subtitle}</p>
                )}
                <p className='text-3xl font-bold font-heading'>{stat.value}</p>
                {stat.button && (
                  <div className='mt-3'>
                    {typeof stat.button === 'function'
                      ? stat.button(setIsCreateModalOpen)
                      : stat.button}
                  </div>
                )}
              </div>
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Stats;
