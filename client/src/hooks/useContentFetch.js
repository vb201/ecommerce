import axios from '../API/axios';
import { useState, useEffect, useCallback } from 'react';
// import { checkExistingState } from '../helpers';

const initialState = [{}];

export const useContentFetch = (fetchURL, sessionName) => {
  const [contentState, setContentState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch function
  const fetch = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      axios.get(fetchURL).then((response) => {
        setContentState(response.data);
        sessionStorage.setItem(sessionName, JSON.stringify(response.data));
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [fetchURL, sessionName]);

  // Initial Fetch
  useEffect(() => {
    const existingState = JSON.parse(sessionStorage.getItem(sessionName));

    if (existingState) {
      setContentState(existingState);
    } else {
      fetch();
    }
  }, [fetch, sessionName]);

  return {
    contentState,
    loading,
    error,
    fetch,
  };
};
