import axios from '../API/axios';
import { useState, useEffect, useCallback } from 'react';
// import { checkExistingState } from '../helpers';

const initialState = [{}];

export const useContentFetch = (
  fetchURL,
  saveTosession,
  sessionName = 'default'
) => {
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
        if (saveTosession)
          sessionStorage.setItem(sessionName, JSON.stringify(response.data));
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [fetchURL, saveTosession, sessionName]);

  // Initial Fetch
  useEffect(() => {
    if (!saveTosession) fetch();
    else {
      const existingState = JSON.parse(sessionStorage.getItem(sessionName));

      if (existingState) {
        setContentState(existingState);
      } else {
        fetch();
      }
    }
  }, [fetch, saveTosession, sessionName]);

  return {
    contentState,
    loading,
    error,
    fetch,
  };
};
