import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const sanitizeInput = (input: string) => {
  return input
    .trim()
    .slice(0, 200)
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};

const validateInput = (input: string) => {
  const trimmedInput = input.trim();
  if (trimmedInput.length > 200) {
    return 'Search term too long (max 200 characters)';
  }
  return null;
};

const useSearchCards = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialQuery = (searchParams.get('search') || '').slice(0, 200);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 300);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedInput = sanitizeInput(value);
    const validationError = validateInput(sanitizedInput);

    setQuery(sanitizedInput);
    setError(validationError);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    if (debouncedQuery.trim()) {
      urlSearchParams.set('search', debouncedQuery.trim());
    } else {
      urlSearchParams.delete('search');
    }
    router.replace(`${pathname}?${urlSearchParams.toString()}`, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, pathname, router]); // intentionally not depending on searchParams to avoid loops

  return {
    query,
    setQuery,
    debouncedQuery: debouncedQuery.length > 0 ? debouncedQuery : undefined,
    error,
    handleInputChange,
  };
};

export default useSearchCards;
