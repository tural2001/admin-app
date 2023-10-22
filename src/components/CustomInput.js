import React from 'react';

export const CustomInput = (props) => {
  const { type, label, i_id, name, val, onCh, onBl, readOnly, key } = props;
  return (
    <div className="form-floating ">
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
        readOnly={readOnly}
        key={key}
      />
    </div>
  );
};

export default CustomInput;
