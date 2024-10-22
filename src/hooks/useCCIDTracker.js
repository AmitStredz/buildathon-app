import { useState } from 'react';

export const useCCIDTracker = (canisterId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateData, setDateData] = useState([]);
  
  const service = new CCIDTrackerService(canisterId);

  const addCCID = async (text) => {
    setLoading(true);
    try {
      const result = await service.add(text);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDateData = async (date) => {
    setLoading(true);
    try {
      const result = await service.getDateData(date);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllData = async () => {
    setLoading(true);
    try {
      const result = await service.getAllData();
      setDateData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const formatDate = async (date) => {
    try {
      return await service.formatDate(date);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    loading,
    error,
    dateData,
    addCCID,
    getDateData,
    getAllData,
    formatDate,
  };
};