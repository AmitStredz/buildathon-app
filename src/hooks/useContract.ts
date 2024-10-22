// import { useState, useEffect } from 'react';
// import { ContractService } from '../lib/services/contract-service';
// import { ContractData } from '../lib/types/contract';
// import { ICP_CONFIG } from '../lib/constants';

// export const useContract = () => {
//   const [data, setData] = useState<ContractData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const contractService = new ContractService(ICP_CONFIG.CANISTER_ID);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const result = await contractService.getData();
//       setData(result);
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error('Unknown error'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add other contract interactions here

//   return { data, loading, error, fetchData };
// };