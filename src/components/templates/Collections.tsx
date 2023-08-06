import { FC } from 'react';
import { RepoData } from 'src/types/type';
import {
  getLocalStorageItem,
  loadMapFromLocalStorage,
} from '~/utils/localstorage';
import NoCollections from './NoCollections';
import { GitFork, Star, Scale } from 'lucide-react';
import { buttonVariants } from '../atoms/Button/Button';
import cn from '~/utils/classNames';
import Link from 'next/link';
import { languageColors } from 'src/constant';

interface CollectionsProps {}

const Collections: FC<CollectionsProps> = () => {
  const collections = loadMapFromLocalStorage('repositoryCollections');

  if (!collections.size) return <NoCollections />;

  console.log(collections);
  type CollectionsType = Map<string, RepoData>;

  // Kita bisa pendefinisikan function renderCollections dengan input berupa CollectionsType
  const renderCollections = (collections: CollectionsType) => (
    <ul>
      {Array.from(collections).map(
        ([key, repo]: [string, RepoData], index: number) => (
          <li
            className="shadow-sm p-4 border border-slate-300 mb-2"
            key={index}
          >
            {/* s1 */}
            <div className="flex items-center">
              <img
                src={repo?.owner?.avatar_url}
                className="w-6 h-6 rounded-full mt-2 mr-1"
              />

              <h6 className="font-bold text-primary text-3xl">
                {repo?.full_name}
              </h6>
            </div>
            {/* s2 */}
            <div className="my-3">
              <p>{repo?.description}</p>{' '}
            </div>
            {/* s3 */}
            <div className="flex justify-between">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4  rounded-full mr-1 ${
                    languageColors[repo?.language?.toLowerCase()]
                  }`}
                />
                <div>{repo?.language}</div>
              </div>
              <div className="flex text-yellow-500">
                <Star className="mr-1" />
                <div>{repo?.stargazers_count}</div>
              </div>
              <div className="flex">
                <GitFork className="mr-1" />
                <div>{repo?.forks_count}</div>
              </div>
            </div>
            <div className="flex items-center justify-center text-lg text-gray-600 border-t border-gray-300 mt-2">
              <Scale className="mr-1" />{' '}
              <div>{repo?.license?.name || 'N/A'}</div>
            </div>
          </li>
        )
      )}
    </ul>
  );
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1>My Collections</h1>
        <Link
          href="/repo"
          className={cn(
            'text-white',
            buttonVariants({ variant: 'primary', size: 'sm' })
          )}
        >
          Go To Search Repo{' '}
        </Link>
      </div>
      <div>{renderCollections(collections)}</div>
    </div>
  );
};

export default Collections;
