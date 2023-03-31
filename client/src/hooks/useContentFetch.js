import axios from '../API/axios';
import { useState, useEffect, useCallback } from 'react';
// import { checkExistingState } from '../helpers';

const initialState = [{}];

export const useContentFetch = (fetchURL) => {
  const [contentState, setContentState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch function
  const fetch = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const request = await axios.get(fetchURL);
      setContentState(request.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [fetchURL]);

  // Initial Fetch
  useEffect(() => {
    fetch();
  }, [fetch, fetchURL]);

  return {
    contentState,
    loading,
    error,
    fetch,
  };
};
