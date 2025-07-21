import { Difficulty } from '@prisma/client';
import { ChevronDown, ChevronRight, Play, Plus, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';

import LanguageFlag from '@/components/language-flag';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { getLanguageStats } from '@/utils/deckUtils';
import { formatDifficulty } from '@/utils/deckUtils';
import type { Deck } from '@/utils/types/deck';

import DeckStats from './deck-stats';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case Difficulty.BEGINNER:
      return 'bg-success-light text-success-dark';
    case Difficulty.INTERMEDIATE:
      return 'bg-warning-light text-warning-dark';
    case Difficulty.ADVANCED:
      return 'bg-error-light text-error-dark';
    default:
      return 'bg-neutral-3 text-neutral-8';
  }
};

const Decks = ({
  decks,
  setIsCreateModalOpen,
}: {
  decks: Deck[];
  setIsCreateModalOpen: (isOpen: boolean) => void;
}) => {
  const languageStats = useMemo(() => getLanguageStats(decks), [decks]);

  const [expandedLanguages, setExpandedLanguages] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Expand the first two languages by default
    const initialExpanded: Record<string, boolean> = {};
    languageStats.slice(0, 2).forEach((languageStat) => {
      initialExpanded[languageStat.code] = true;
    });
    setExpandedLanguages(initialExpanded);
  }, [languageStats]);

  const toggleLanguageExpansion = (languageCode: string) => {
    setExpandedLanguages((prev) => ({
      ...prev,
      [languageCode]: !prev[languageCode],
    }));
  };

  return (
    <div className='space-y-6'>
      {languageStats.map((languageStat) => (
        <div
          key={languageStat.code}
          className='bg-background-white rounded-lg shadow-soft border border-neutral-3'
        >
          <Collapsible
            open={!!expandedLanguages[languageStat.code]}
            onOpenChange={() => toggleLanguageExpansion(languageStat.code)}
          >
            <CollapsibleTrigger className='w-full p-6 flex items-center justify-between rounded-2xl hover:bg-neutral-1 transition-colors cursor-pointer'>
              <div className='flex items-center space-x-3'>
                <LanguageFlag languageCode={languageStat.code} size={24} />
                <div className='text-left'>
                  <h2 className='text-xl font-semibold font-heading text-text-primary'>
                    {languageStat.name}
                  </h2>
                  <p className='text-sm text-text-muted'>
                    {languageStat.deckCount} deck
                    {languageStat.deckCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              {expandedLanguages[languageStat.code] ? (
                <ChevronDown className='h-5 w-5 text-neutral-6 cursor-pointer' />
              ) : (
                <ChevronRight className='h-5 w-5 text-neutral-6 cursor-pointer' />
              )}
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className='px-6 pb-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch'>
                  {languageStat.decks.map((deck) => (
                    <Card
                      key={deck.id}
                      className='hover:shadow-primary py-6 transition-shadow duration-200 border-neutral-3 h-full flex flex-col min-h-[220px]'
                    >
                      <CardHeader className='pb-2'>
                        <div className='flex items-start justify-between'>
                          <CardTitle className='text-lg font-medium text-text-primary line-clamp-2'>
                            {deck.name}
                          </CardTitle>
                          {deck.difficulty && (
                            <Badge
                              className={`text-xs ${getDifficultyColor(
                                deck.difficulty
                              )}`}
                            >
                              {formatDifficulty(deck.difficulty)}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className='pt-0 h-full'>
                        <div className='space-y-2 flex flex-col justify-between h-full'>
                          <DeckStats deckId={deck.id} />

                          <div className='flex space-x-2 pt-2 w-full'>
                            <Link
                              href={`/decks/${deck.id}/study`}
                              className='flex-1'
                            >
                              <Button
                                size='sm'
                                className='bg-primary-600 hover:bg-primary-700 text-white w-full'
                              >
                                <Play className='h-4 w-4 mr-1' />
                                Study
                              </Button>
                            </Link>
                            <Link
                              href={`/decks/${deck.id}/manage-cards`}
                              className='flex-1'
                            >
                              <Button
                                size='sm'
                                variant='soft'
                                className='w-full'
                              >
                                <SquarePen className='h-4 w-4 mr-1' />
                                {deck.cardsCount > 0
                                  ? 'Manage Cards'
                                  : 'Add Cards'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className='hover:shadow-primary py-6 transition-shadow duration-200 border-neutral-3 items-center h-full flex flex-col min-h-[220px]'>
                    <button
                      className='w-full flex-1 flex flex-col items-center justify-evenly h-full cursor-pointer'
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      <CardTitle className='text-lg font-medium text-text-primary line-clamp-2'>
                        Add a New Deck
                      </CardTitle>
                      <div className='w-12 h-12 rounded-full bg-secondary-100 text-secondary-800 flex items-center justify-center mt-4'>
                        <Plus className='h-4 w-4' />
                      </div>
                    </button>
                  </Card>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default Decks;
