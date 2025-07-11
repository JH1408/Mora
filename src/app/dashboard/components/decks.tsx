import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Play, Edit3 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeckWithCardCount } from '@/types/deck';
import { getLanguageStats } from '@/utils/deckUtils';
import { formatDifficulty } from '@/utils/deckUtils';
import { Difficulty } from '@prisma/client';
import LanguageFlag from '@/components/language-flag';

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

const Decks = ({ decks }: { decks: DeckWithCardCount[] }) => {
  const [expandedLanguages, setExpandedLanguages] = useState<
    Record<string, boolean>
  >({});

  const languageStats = useMemo(() => getLanguageStats(decks), [decks]);

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
            open={expandedLanguages[languageStat.code]}
            onOpenChange={() => toggleLanguageExpansion(languageStat.code)}
          >
            <CollapsibleTrigger className='w-full p-6 flex items-center justify-between hover:bg-neutral-1 transition-colors'>
              <div className='flex items-center space-x-3'>
                <LanguageFlag languageCode={languageStat.code} size={24} />
                <div>
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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {languageStat.decks.map((deck) => (
                    <Card
                      key={deck.id}
                      className='hover:shadow-primary py-6 transition-shadow duration-200 border-neutral-3'
                    >
                      <CardHeader className='pb-3'>
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

                      <CardContent className='pt-0'>
                        <div className='space-y-3'>
                          {/* Stats */}
                          <div className='flex justify-between text-sm text-text-secondary'>
                            <span>{deck.cardsCount} cards</span>
                            {/* <span>{deck.studiedToday} studied today</span> */}
                          </div>

                          {/* <p className='text-xs text-text-muted'>
                            Last studied: {deck.lastStudied}
                          </p> */}

                          {/* Action Buttons */}
                          <div className='flex space-x-2 pt-2'>
                            <Button
                              size='sm'
                              className='flex-1 bg-primary-600 hover:bg-primary-700 text-white'
                            >
                              <Play className='h-4 w-4 mr-1' />
                              Study
                            </Button>
                            <Button size='sm' variant='soft' className='flex-1'>
                              <Edit3 className='h-4 w-4 mr-1' />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
