import React, { useCallback, useEffect, useState } from 'react';
import { RepoData } from 'src/types/type';
import { FaSpinner } from 'react-icons/fa';

const RepositoryCard = ({
  selectedRepo,
  addToCollection,
}: {
  selectedRepo: RepoData;
  addToCollection: () => void;
}) => {
  return (
    <div className="mt-4">
      {/* Logo repository */}
      <img
        className="w-16 h-16 rounded-full mx-auto"
        src={selectedRepo?.owner?.avatar_url}
        alt="Repo Logo"
      />

      {/* Informasi repository */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{selectedRepo?.full_name}</h1>
        <p className="text-xl font-bold mb-4">{selectedRepo?.description}</p>
        <div className="flex justify-between">
          <p className="text-lg text-gray-600">
            📝 Open Issues: {selectedRepo?.open_issues_count}
          </p>
          <p className="text-lg text-gray-600">
            ⭐ Total Stars: {selectedRepo?.stargazers_count}
          </p>
          <p className="text-lg text-gray-600">
            💻 Total Forks: {selectedRepo?.forks_count}
          </p>
        </div>
        <p className="text-lg text-gray-600">
          License: {selectedRepo?.license?.name || 'N/A'}
        </p>

        {/* Add to Collection button */}
        <button
          onClick={addToCollection}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Add to Collection
        </button>
      </div>
    </div>
  );
};
const GitHubRepositoryInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<RepoData[] | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<RepoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [collection, setCollection] = useState<Map<number, RepoData>>(() => {
    return new Map();
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if we are in the browser environment
      const collectionData = localStorage.getItem('repositoryCollection');
      if (collectionData) {
        const parsedData = JSON.parse(collectionData);
        setCollection(new Map(parsedData));
      }
    }
  }, []);
  const accessToken = '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';

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const fetchSearchResults = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.items);
      } else {
        setIsError(true);
        setSearchResults(null);
      }
    } catch (error) {
      setIsError(true);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, searchTerm]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      fetchSearchResults();
    },
    [fetchSearchResults]
  );

  const fetchRepoDetails = useCallback(
    async (repo: RepoData) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(repo.url, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSelectedRepo(data);
        } else {
          setIsError(true);
          setSelectedRepo(null);
        }
      } catch (error) {
        setIsError(true);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const addToCollection = useCallback(() => {
    if (selectedRepo) {
      const newCollection = new Map(collection);
      newCollection.set(selectedRepo.id, selectedRepo);
      if (typeof window !== 'undefined') {
        // Check if localStorage is available in the browser environment
        try {
          localStorage.setItem(
            'repositoryCollection',
            JSON.stringify(Array.from(newCollection.entries()))
          );
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
      setCollection(newCollection);
    }
  }, [selectedRepo, collection]);

  return (
    <div className="space-y-4">
      <div className="w-full md:w-96 mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleFormSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search repositories"
            value={searchTerm}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-grow"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>

        {isLoading && (
          <div className="flex items-center justify-center mb-4">
            <FaSpinner className="animate-spin mr-2" />
            <p>Loading...</p>
          </div>
        )}
        {isError && (
          <p className="text-red-500 text-center mb-4">
            Error fetching data. Please check the search term.
          </p>
        )}

        {searchResults && (
          <div className="mt-4 max-h-36 overflow-y-scroll scrollbar-w-2">
            <h2 className="text-2xl font-bold mb-2">Search Results</h2>
            <ul className="space-y-2">
              {searchResults.map((repo) => (
                <li
                  key={repo.id}
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                  onClick={() => fetchRepoDetails(repo)}
                >
                  {repo.full_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedRepo && (
        <div className="w-72 mx-auto bg-white shadow-lg rounded-lg p-4">
          <RepositoryCard
            selectedRepo={selectedRepo}
            addToCollection={addToCollection}
          />
        </div>
      )}

      {collection.size > 0 && (
        <div className="w-72 mx-auto bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-2">Your Collection</h2>
          <ul className="space-y-2">
            {Array.from(collection.values()).map((repo) => (
              <li key={repo.id}>{repo.full_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default GitHubRepositoryInfo;

// interface SearchResultsListProps {
//   searchTerm: string;
//   searchResults: RepoData[] | null;
//   isLoading: boolean;
//   isError: boolean;
//   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleFormSubmit: (event: React.FormEvent) => void;
//   fetchRepoDetails: (repo: RepoData) => void;
// }

// const SearchResultsList: React.FC<SearchResultsListProps> = ({
//   searchTerm,
//   searchResults,
//   isLoading,
//   isError,
//   handleInputChange,
//   handleFormSubmit,
//   fetchRepoDetails,
// }) => {
//   return (
//     <div className="w-full md:w-96 mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
//       <form onSubmit={handleFormSubmit} className="flex gap-2 mb-4">
//         <input
//           type="text"
//           name="searchTerm"
//           placeholder="Search repositories"
//           value={searchTerm}
//           onChange={handleInputChange}
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-grow"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Search
//         </button>
//       </form>

//       {isLoading && (
//         <div className="flex items-center justify-center mb-4">
//           <FaSpinner className="animate-spin mr-2" />
//           <p>Loading...</p>
//         </div>
//       )}
//       {isError && (
//         <p className="text-red-500 text-center mb-4">
//           Error fetching data. Please check the search term.
//         </p>
//       )}

//       {searchResults && (
//         <div className="mt-4 max-h-36 overflow-y-scroll scrollbar-w-2">
//           <h2 className="text-2xl font-bold mb-2">Search Results</h2>
//           <ul className="space-y-2">
//             {searchResults.map((repo) => (
//               <li
//                 key={repo.id}
//                 className="cursor-pointer text-blue-500 hover:text-blue-600"
//                 onClick={() => fetchRepoDetails(repo)}
//               >
//                 {repo.full_name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
