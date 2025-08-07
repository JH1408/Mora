import { PenTool, TabletSmartphone, Repeat, Volume2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <PenTool className='w-7 h-7' />,
    title: 'Handwritten Input',
    description:
      'Draw characters, symbols, or sketches — perfect for learning unique scripts or visual memorization.',
    gradient: 'from-primary-500 to-primary-600',
    bgGradient: 'from-primary-50 to-primary-100',
  },

  {
    icon: <Repeat className='w-7 h-7' />,
    title: 'Spaced Repetition',
    description:
      'Built-in memory science helps you retain words longer — no need to think about what to review next.',
    gradient: 'from-secondary-500 to-secondary-600',
    bgGradient: 'from-secondary-50 to-secondary-100',
  },
  {
    icon: <Volume2 className='w-7 h-7' />,
    title: 'Text-to-Speech',
    description:
      'Hear how words sound with one tap. Great for auditory learners and tonal languages like Thai, Vietnamese and Chinese.',
    gradient: 'from-accent-500 to-accent-600',
    bgGradient: 'from-accent-50 to-accent-100',
  },
  {
    icon: <TabletSmartphone className='w-7 h-7' />,
    title: 'Tablet & Stylus Friendly',
    description:
      'Fully optimized for iPads and stylus input. Natural, smooth handwriting experience.',

    gradient: 'from-primary-400 to-accent-500',
    bgGradient: 'from-primary-50 to-accent-50',
  },
];

const KeyFeatures = () => {
  return (
    <section className='py-30 px-4 md:px-8 max-w-6xl mx-auto'>
      <div className='text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-hero text-text-primary'>
          Key Features
        </h2>
        <p className='text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed text-muted-foreground max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6 md:px-8'>
          Discover the powerful tools that make Mora the perfect companion for
          your language learning journey
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8'>
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className={`
              group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl 
              transition-all duration-200 ease-out transform hover:-translate-y-1
              bg-gradient-to-br ${feature.bgGradient} hover:scale-102
            `}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm' />
            <CardContent className='relative p-8 text-center'>
              <div
                className={`
                  flex items-center justify-center w-16 h-16 mb-6 mx-auto 
                  bg-gradient-to-br ${feature.gradient} rounded-2xl
                  shadow-lg group-hover:shadow-xl transition-all duration-150
                  group-hover:scale-105
                `}
              >
                <div className='text-white'>{feature.icon}</div>
              </div>

              <h3 className='text-xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors'>
                {feature.title}
              </h3>

              <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors'>
                {feature.description}
              </p>

              <div
                className={`
                  absolute top-0 right-0 w-20 h-20 
                  bg-gradient-to-br ${feature.gradient} opacity-10 
                  rounded-full -translate-y-10 translate-x-10
                  group-hover:opacity-20 transition-opacity duration-150
                `}
              />

              <div
                className={`
                  absolute bottom-0 left-0 w-16 h-16 
                  bg-gradient-to-br ${feature.gradient} opacity-10 
                  rounded-full translate-y-8 -translate-x-8
                  group-hover:opacity-20 transition-opacity duration-150
                `}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
