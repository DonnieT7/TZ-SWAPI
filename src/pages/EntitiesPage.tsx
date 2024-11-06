import React, { useEffect, useState } from 'react';
import EntityTable from '../components/EntityTable';

// Страница со списком сущностей
const EntitiesPage: React.FC = () => {
  const [entities, setEntities] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Функция для загрузки данных с API
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await response.json();
        setEntities(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Подсчет общего количества страниц
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, [page]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">List of Characters</h1>
      {/* Проверка загрузки данных */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <EntityTable
          entities={entities}
          currentPage={page}
          isLastPage={page === totalPages}
          onPreviousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNextPage={() => setPage((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default EntitiesPage;
