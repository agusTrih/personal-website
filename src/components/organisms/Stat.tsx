import React, { useCallback, useEffect, useState } from 'react';
import { RepoData } from 'src/types/type';
import { FaSpinner } from 'react-icons/fa';
import { TOKEN } from 'src/config/environment';
import { toast } from 'react-hot-toast';
import {
  loadMapFromLocalStorage,
  saveMapToLocalStorage,
} from '~/utils/localstorage';
import { GitFork, Star, BookKey, Scale } from 'lucide-react';
import cn from '~/utils/classNames';
import { languageColors } from 'src/constant';
import Link from 'next/link';
import { buttonVariants } from '../atoms/Button/Button';
import { fetchGitHubRateLimit } from 'src/config/fetchgGithubLimit';
import { useQuery } from '@tanstack/react-query';
const RepositoryCard = ({
  selectedRepo,
  addToCollection,
}: {
  selectedRepo: RepoData;
  addToCollection: () => void;
}) => {
  return (
    <div className="mt-4">
      {/* <p className="text-lg text-gray-600">
        License: {selectedRepo?.license?.name || 'N/A'}
      </p>

    */}
      <div className="shadow-sm p-4 border border-slate-300">
        {/* s1 */}
        <div className="flex items-center">
          <img
            src={selectedRepo?.owner?.avatar_url}
            className="w-6 h-6 rounded-full mt-2 mr-1"
          />

          <h6 className="font-bold text-primary text-3xl">
            {selectedRepo?.full_name}
          </h6>
        </div>
        {/* s2 */}
        <div className="my-3">
          <p>{selectedRepo?.description}</p>{' '}
        </div>
        {/* s3 */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <div
              className={`w-4 h-4  rounded-full mr-1 ${
                languageColors[selectedRepo?.language?.toLowerCase()]
              }`}
            />
            <div>{selectedRepo?.language}</div>
          </div>
          <div className="flex text-yellow-500">
            <Star className="mr-1" />
            <div>{selectedRepo?.stargazers_count}</div>
          </div>
          <div className="flex">
            <GitFork className="mr-1" />
            <div>{selectedRepo?.forks_count}</div>
          </div>
        </div>
        <div className="flex items-center justify-center text-lg text-gray-600 border-t border-gray-300 mt-2">
          {/* <Scale className="mr-1" />{' '}
          <div>{selectedRepo?.license?.name || 'N/A'}</div> */}
          <button
            onClick={addToCollection}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add to Collection
          </button>
        </div>
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
  const { data, error } = useQuery(['rateLimit'], fetchGitHubRateLimit);
  console.log(data);

  useEffect(() => {
    const collectionFromLocal = loadMapFromLocalStorage(
      'repositoryCollections'
    );

    setCollection(collectionFromLocal);
  }, []);
  const accessToken = TOKEN;

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
            Authorization: accessToken || '',
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
            Authorization: accessToken || '',
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
          saveMapToLocalStorage('repositoryCollections', newCollection);
          toast.success(
            `Successfully Add ${selectedRepo?.full_name} to  collections`
          );
        } catch (error) {
          toast.error(`failed Add ${selectedRepo?.full_name}  to  collections`);
          console.error('Error saving to localStorage:', error);
        }
      }
      setCollection(newCollection);
    }
  }, [selectedRepo, collection]);

  return (
    <div className="space-y-4 px-4">
      <div className="w-full sm:max-w-xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
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
        <div className="max-w-lg sm:max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4">
          <RepositoryCard
            selectedRepo={selectedRepo}
            addToCollection={addToCollection}
          />
        </div>
      )}

      <div className="p-4 flex justify-center items-center flex-col ">
        <h6 className="mb-4">You Have {collection?.size} collections Repo</h6>
        <div>
          <Link
            href="/collections"
            className={cn(
              'text-white',
              buttonVariants({ variant: 'primary', size: 'sm' })
            )}
          >
            Go To collections
          </Link>
        </div>
      </div>
      {/* {collection.size > 0 && (
        <div className="w-72 mx-auto bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-2">Your Collection</h2>
          <ul className="space-y-2">
            {Array.from(collection.values()).map((repo) => (
              <li key={repo.id}>{repo.full_name}</li>
            ))}
          </ul>
        </div>
      )} */}
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
