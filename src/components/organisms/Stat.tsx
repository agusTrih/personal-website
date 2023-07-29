import React, { useCallback, useState } from 'react';
import { RepoData } from 'src/types/type';

const GitHubRepositoryInfo = () => {
  const [username, setUsername] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [datas, setDatas] = useState<RepoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const accessToken = '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';

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'username') {
        setUsername(value);
      } else if (name === 'repositoryName') {
        setRepositoryName(value);
      }
    },
    []
  );
  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repositoryName}`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDatas(data);
      } else {
        setIsError(true);
        setDatas(null);
      }
    } catch (error) {
      setIsError(true);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData();
  };
  console.log(username);

  return (
    <div className="flex flex-col items-center space-y-4">
      <form onSubmit={handleFormSubmit} className="flex gap-2">
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          name="repositoryName"
          placeholder="Enter repository name"
          value={repositoryName}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Fetch Repository Info
        </button>
      </form>

      {isLoading && <p className="text-center mt-4">Loading...</p>}
      {isError && (
        <p className="text-red-500 text-center mt-4">
          Error fetching data. Please check the username and repository name.
        </p>
      )}

      {datas && (
        <div className="mt-4 max-w-md p-2 shadow-md">
          {/* Logo repository */}
          <img
            className="w-16 h-16 rounded-full mx-auto"
            src={datas?.owner?.avatar_url}
            alt="Repo Logo"
          />

          {/* Informasi repository */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{datas?.full_name}</h1>
            <p className="text-sm font-normal text-gray-500 mb-4">
              {datas?.description}
            </p>
            <div className="flex justify-between">
              <p className="text-lg text-gray-600">
                📝 Open Issues: {datas?.open_issues_count}
              </p>
              <p className="text-lg text-gray-600">
                ⭐ Total Stars: {datas?.stargazers_count}
              </p>
              <p className="text-lg text-gray-600">
                💻 Total Forks: {datas?.forks_count}
              </p>
            </div>
            <p className="text-lg text-gray-600">
              License: {datas?.license?.name || 'N/A'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubRepositoryInfo;
