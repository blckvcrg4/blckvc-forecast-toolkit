import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Papa from 'papaparse';
import { Octokit } from '@octokit/rest';
import { 
  DriversData, 
  RevModelData, 
  CostModelData, 
  ForecastData,
  ScenariosData,
  TargetsData
} from '../models/forecastModels';
import { calculateRevModel, calculateCostModel, calculateForecast } from '../utils/calculationUtils';

interface ForecastContextType {
  loading: boolean;
  authenticated: boolean;
  token: string;
  repoOwner: string;
  repoName: string;
  driversData: DriversData[];
  revModelData: RevModelData[];
  costModelData: CostModelData[];
  forecastData: ForecastData[];
  scenariosData: ScenariosData[];
  targetsData: TargetsData[];
  initializeApp: () => void;
  authenticateWithGitHub: (token: string, owner: string, repo: string) => Promise<boolean>;
  updateDriversData: (newData: DriversData[]) => Promise<void>;
  updateRevModelData: (newData: RevModelData[]) => Promise<void>;
  updateCostModelData: (newData: CostModelData[]) => Promise<void>;
  updateForecastData: (newData: ForecastData[]) => Promise<void>;
  updateScenariosData: (newData: ScenariosData[]) => Promise<void>;
  updateTargetsData: (newData: TargetsData[]) => Promise<void>;
  recalculateModels: () => void;
  saveAllData: () => Promise<void>;
}

const ForecastContext = createContext<ForecastContextType | undefined>(undefined);

export const useForecast = (): ForecastContextType => {
  const context = useContext(ForecastContext);
  if (!context) {
    throw new Error('useForecast must be used within a ForecastProvider');
  }
  return context;
};

export const ForecastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [driversData, setDriversData] = useState<DriversData[]>([]);
  const [revModelData, setRevModelData] = useState<RevModelData[]>([]);
  const [costModelData, setCostModelData] = useState<CostModelData[]>([]);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [scenariosData, setScenariosData] = useState<ScenariosData[]>([]);
  const [targetsData, setTargetsData] = useState<TargetsData[]>([]);
  const [octokit, setOctokit] = useState<Octokit | null>(null);

  // Initialize app from local storage or default state
  const initializeApp = useCallback(() => {
    setLoading(true);

    // Check for saved authentication in localStorage
    const savedToken = localStorage.getItem('githubToken');
    const savedOwner = localStorage.getItem('repoOwner');
    const savedRepo = localStorage.getItem('repoName');

    if (savedToken && savedOwner && savedRepo) {
      authenticateWithGitHub(savedToken, savedOwner, savedRepo)
        .then(success => {
          if (!success) {
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Authenticate with GitHub and load initial data
  const authenticateWithGitHub = async (
    authToken: string, 
    owner: string, 
    repo: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      
      const oct = new Octokit({ auth: authToken });
      setOctokit(oct);
      setToken(authToken);
      setRepoOwner(owner);
      setRepoName(repo);
      
      // Save auth info to localStorage
      localStorage.setItem('githubToken', authToken);
      localStorage.setItem('repoOwner', owner);
      localStorage.setItem('repoName', repo);
      
      // Load data from GitHub repo
      try {
        const files = ['drivers.csv', 'rev-model.csv', 'cost-model.csv', 'forecast.csv', 'case-switch.csv', 'targets.csv'];
        const dataPromises = files.map(file => loadFileFromGitHub(oct, owner, repo, file));
        const results = await Promise.all(dataPromises);
        
        if (results[0]) setDriversData(results[0] as DriversData[]);
        if (results[1]) setRevModelData(results[1] as RevModelData[]);
        if (results[2]) setCostModelData(results[2] as CostModelData[]);
        if (results[3]) setForecastData(results[3] as ForecastData[]);
        if (results[4]) setScenariosData(results[4] as ScenariosData[]);
        if (results[5]) setTargetsData(results[5] as TargetsData[]);
        
        setAuthenticated(true);
        setLoading(false);
        return true;
      } catch (error) {
        console.error("Couldn't load all files from GitHub, using default data", error);
        // Load default data from imported CSVs
        // For a real app, we'd load from local files
        setAuthenticated(true);
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error("Failed to authenticate with GitHub", error);
      setLoading(false);
      return false;
    }
  };

  // Load a file from GitHub repository
  const loadFileFromGitHub = async (
    octokitClient: Octokit,
    owner: string,
    repo: string,
    path: string
  ) => {
    try {
      const { data } = await octokitClient.repos.getContent({
        owner,
        repo,
        path,
      });
      
      if (!Array.isArray(data) && data.type === 'file' && data.content) {
        const content = atob(data.content);
        const parsed = Papa.parse(content, { header: true });
        return parsed.data;
      }
      return null;
    } catch (error) {
      console.error(`Failed to load ${path} from GitHub`, error);
      return null;
    }
  };

  // Save a file to GitHub repository
  const saveFileToGitHub = async (
    path: string,
    content: string,
    message: string
  ) => {
    if (!octokit) throw new Error('Not authenticated with GitHub');
    
    try {
      // First try to get the file to get the SHA
      try {
        const { data } = await octokit.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path,
        });
        
        if (!Array.isArray(data) && data.sha) {
          // Update existing file
          await octokit.repos.createOrUpdateFileContents({
            owner: repoOwner,
            repo: repoName,
            path,
            message,
            content: btoa(content),
            sha: data.sha,
          });
          return true;
        }
      } catch (error) {
        // File doesn't exist, create it
        await octokit.repos.createOrUpdateFileContents({
          owner: repoOwner,
          repo: repoName,
          path,
          message,
          content: btoa(content),
        });
        return true;
      }
    } catch (error) {
      console.error(`Failed to save ${path} to GitHub`, error);
      return false;
    }
  };

  // Update functions for each data model
  const updateDriversData = async (newData: DriversData[]) => {
    setDriversData(newData);
    recalculateModels();
    
    if (authenticated) {
      const csvContent = Papa.unparse(newData);
      await saveFileToGitHub('drivers.csv', csvContent, 'Update drivers data');
    }
  };

  const updateRevModelData = async (newData: RevModelData[]) => {
    setRevModelData(newData);
    
    if (authenticated) {
      const csvContent = Papa.unparse(newData);
      await saveFileToGitHub('rev-model.csv', csvContent, 'Update revenue model data');
    }
  };

  const updateCostModelData = async (newData: CostModelData[]) => {
    setCostModelData(newData);
    
    if (authenticated) {
      const csvContent = Papa.unparse(newData);
      await saveFileToGitHub('cost-model.csv', csvContent, 'Update cost model data');
    }
  };

  const updateForecastData = async (newData: ForecastData[]) => {
    setForecastData(newData);
    
    if (authenticated) {
      const csvContent = Papa.unparse(newData);
      await saveFileToGitHub('forecast.csv', csvContent, 'Update forecast data');
    }
  };

  const updateScenariosData = async (newData: ScenariosData[]) => {
    setScenariosData(newData);
    recalculateModels();
    
    if (authenticated) {
      const csvContent = Papa.unparse(newData);
      await saveFileToGitHub('case-switch.csv', csvContent, 'Update scenarios data');
    }
  };

  const updateTargetsData = async (newData: TargetsData[]) => {
    setTargetsData(newData);
    
    if (authenticated) {
      const csvContent = Papa.unparse(newData);
      await saveFileToGitHub('targets.csv', csvContent, 'Update targets data');
    }
  };

  // Recalculate all dependent models based on drivers and scenarios
  const recalculateModels = () => {
    const newRevModelData = calculateRevModel(driversData, scenariosData);
    setRevModelData(newRevModelData);
    
    const newCostModelData = calculateCostModel(driversData, scenariosData);
    setCostModelData(newCostModelData);
    
    const newForecastData = calculateForecast(newRevModelData, newCostModelData, targetsData);
    setForecastData(newForecastData);
  };

  // Save all data to GitHub
  const saveAllData = async () => {
    if (!authenticated || !octokit) return;
    
    const dataMap = [
      { data: driversData, filename: 'drivers.csv', message: 'Update drivers data' },
      { data: revModelData, filename: 'rev-model.csv', message: 'Update revenue model data' },
      { data: costModelData, filename: 'cost-model.csv', message: 'Update cost model data' },
      { data: forecastData, filename: 'forecast.csv', message: 'Update forecast data' },
      { data: scenariosData, filename: 'case-switch.csv', message: 'Update scenarios data' },
      { data: targetsData, filename: 'targets.csv', message: 'Update targets data' }
    ];
    
    const savePromises = dataMap.map(({ data, filename, message }) => {
      const csvContent = Papa.unparse(data);
      return saveFileToGitHub(filename, csvContent, message);
    });
    
    await Promise.all(savePromises);
  };

  const value: ForecastContextType = {
    loading,
    authenticated,
    token,
    repoOwner,
    repoName,
    driversData,
    revModelData,
    costModelData,
    forecastData,
    scenariosData,
    targetsData,
    initializeApp,
    authenticateWithGitHub,
    updateDriversData,
    updateRevModelData,
    updateCostModelData,
    updateForecastData,
    updateScenariosData,
    updateTargetsData,
    recalculateModels,
    saveAllData
  };

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
};
