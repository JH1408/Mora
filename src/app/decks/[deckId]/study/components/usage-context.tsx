const UsageContext = ({ usageContext }: { usageContext?: string | null }) => {
  return (
    <>
      <h3 className='text-lg font-semibold text-text-primary mb-4'>
        Usage Context
      </h3>
      {usageContext ? (
        <p className='text-sm text-text-muted leading-relaxed italic whitespace-pre-wrap'>
          {usageContext}
        </p>
      ) : (
        <p className='text-sm text-text-light italic'>
          You haven&apos;t entered any usage context for this card.
        </p>
      )}
    </>
  );
};

export default UsageContext;
