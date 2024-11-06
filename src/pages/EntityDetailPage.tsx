import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EntityDetailForm from '../components/EntityDetailForm';

interface EntityDetail {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
}

const EntityDetailPage: React.FC = () => {
  const { id } = useParams();
  const [entity, setEntity] = useState<EntityDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Порядок полей для отображения
  const fieldsOrder: Array<keyof EntityDetail> = ['name', 'gender', 'height', 'birth_year'];

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      const data = await response.json();

      const filteredData = {
        name: data.name,
        gender: data.gender,
        height: data.height,
        birth_year: data.birth_year,
      };
      setEntity(filteredData);
    };
    fetchEntity();
  }, [id]);

  const handleSave = (data: EntityDetail) => {
    setEntity(data);
    setIsEditing(false);
  };

  if (!entity) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Details of {entity.name}
        </h2>
        {isEditing ? (
          <EntityDetailForm entity={entity} onSubmit={handleSave} />
        ) : (
          <div className="space-y-4">
            {fieldsOrder.map((key) => (
              <p key={key} className="text-gray-700">
                <span className="font-semibold">{key.replace('_', ' ')}:</span> {entity[key]}
              </p>
            ))}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full px-4 py-2 bg-purple-500 text-white font-medium text-sm rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityDetailPage;
