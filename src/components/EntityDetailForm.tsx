import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface EntityDetailFormProps {
  entity: EntityDetail;
  onSubmit: (data: EntityDetail) => void;
}

interface EntityDetail {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
}

// Валидация с использованием yup
const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  gender: yup.string().required('Gender is required'),
  height: yup.number().typeError('Height must be a number').required('Height is required'),
  birth_year: yup.string().required('Birth year is required'),
});

// Форма для редактирования сущности
const EntityDetailForm: React.FC<EntityDetailFormProps> = ({ entity, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EntityDetail>({
    resolver: yupResolver(validationSchema),
    defaultValues: entity,
  });

  // Порядок полей
  const fieldsOrder: Array<keyof EntityDetail> = ['name', 'gender', 'height', 'birth_year'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Поля для редактирования атрибутов сущности */}
      {fieldsOrder.map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-600">{key.replace('_', ' ')}</label>
          <input
            {...register(key)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* Сообщения об ошибках */}
          {errors[key] && <p className="text-red-500 text-sm">{errors[key]?.message}</p>}
        </div>
      ))}
      {/* Кнопка сохранения */}
      <button type="submit" className="w-full px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">Save Changes</button>
    </form>
  );
};

export default EntityDetailForm;
