import React from 'react';
import { Link } from 'react-router-dom';

interface EntityTableProps {
  entities: any[];
  currentPage: number;
  isLastPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

// Таблица для отображения списка сущностей
const EntityTable: React.FC<EntityTableProps> = ({
  entities,
  currentPage,
  isLastPage,
  onPreviousPage,
  onNextPage,
}) => (
  <div>
    {/* Таблица данных */}
    <table className="w-full bg-white border rounded shadow-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Gender</th>
          <th className="px-4 py-2 text-left">Height</th>
          <th className="px-4 py-2 text-left">Birth Year</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => {
          const id = entity.url.match(/\/people\/(\d+)\//)?.[1];
          return (
            <tr key={id} className="border-t hover:bg-gray-100">
              {/* Данные сущности */}
              <td className="px-4 py-2">
                <Link to={`/entities/${id}`} className="text-purple-500 hover:underline">
                  {entity.name}
                </Link>
              </td>
              <td className="px-4 py-2">{entity.gender}</td>
              <td className="px-4 py-2">{entity.height}</td>
              <td className="px-4 py-2">{entity.birth_year}</td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {/* Пагинация */}
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-600 disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">Page {currentPage}</span>
      <button
        onClick={onNextPage}
        disabled={isLastPage}
        className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-600 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
);

export default EntityTable;
