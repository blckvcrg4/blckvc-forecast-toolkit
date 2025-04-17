import React, { useState } from 'react';
import { useForecast } from '../context/ForecastContext';

const GitHubAuth: React.FC = () => {
  const { authenticateWithGitHub } = useForecast();
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await authenticateWithGitHub(token, owner, repo);
      if (!success) {
        setError('Failed to authenticate with GitHub. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during authentication. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            BLCK VC Forecast Toolkit
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect to GitHub to save your forecast data
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="token" className="sr-only">GitHub Personal Access Token</label>
              <input
                id="token"
                name="token"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="GitHub Personal Access Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="owner" className="sr-only">Repository Owner</label>
              <input
                id="owner"
                name="owner"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Repository Owner (username or organization)"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="repo" className="sr-only">Repository Name</label>
              <input
                id="repo"
                name="repo"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Repository Name"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Authentication Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Connecting...' : 'Connect to GitHub'}
            </button>
          </div>
          
          <div className="text-sm text-center">
            <p className="text-gray-600">
              Need a GitHub token? <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create one here
              </a> with 'repo' scope.
            </p>
          </div>
          
          <div className="text-xs text-center text-gray-500 mt-8">
            <p>
              Your token is only used to authenticate with GitHub and is stored in your browser's local storage.
              No data is sent to any third-party servers.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GitHubAuth;
