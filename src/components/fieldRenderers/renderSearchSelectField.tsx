/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { IField } from '../FormComponent';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { useThemeStore } from '../../stores/themeStore';

export const renderSearchSelectField = (
  field: IField,
  control: unknown,
  errors: FieldErrors<FieldValues>
) => (
  <SearchSelectFieldInternal
    field={field}
    control={control}
    errors={errors}
  />
);

const SearchSelectFieldInternal: React.FC<{
  field: IField,
  control: unknown,
  errors: FieldErrors<FieldValues>
}> = ({ field, control, errors }) => {
  const { theme } = useThemeStore();
  return (
    <>
      {field.label ? <label htmlFor={field.id} className='form-label'>{field.label}</label> : false}
      <Controller
        name={field.id}
        control={control as Control<FieldValues>}
        render={({ field: { onChange, value } }) => {
          const [show, setShow] = useState(false);
          const [text, setText] = useState('');
          const inputRef = useRef<HTMLInputElement>(null);
          const options = (field.options ?? []).map(opt => ({ id: opt.value, label: opt.label }));

          useEffect(() => {
            if (!show && value) {
              const selected = options.find(opt => opt.id === value);
              setText(selected ? selected.label : '');
            }
            if (!value && !show) {
              setText('');
            }
          }, [value, show, options]);

          React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
              if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShow(false);
              }
            };
            if (show) document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
          }, [show]);

          const filteredOptions = options.filter(
            (el) =>
              el.label.toLowerCase().includes(text.toLowerCase()) &&
              (value !== el.id)
          );

          const add = (id: string) => {
            onChange(id);
            setShow(false);
            const selected = options.find(opt => opt.id === id);
            setText(selected ? selected.label : '');
          };

          return (
            <div className="form-group position-relative mt-2">
              <input
                ref={inputRef}
                className={`form-select rounded-4 p-3 text-bg-${theme}`}
                placeholder={field.placeholder}
                type="text"
                readOnly={field.readOnly}
                value={text}
                onFocus={() => setShow(true)}
                onChange={e => {
                  setText(e.target.value);
                  setShow(true);
                }}
              />

              {show && (text || filteredOptions.length > 0) ? (
                <ul
                  className="list-group position-absolute top-100 w-100 mt-0 overflow-scroll-y"
                  style={{ height: '120px', zIndex: 10 }}
                >
                  {!!text && filteredOptions.length === 0 && (
                    <li className="list-group-item w-100 text-dark text-center">No item found</li>
                  )}
                  {filteredOptions.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item w-100 text-dark d-flex flex-row"
                      onMouseDown={() => add(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.label}
                    </li>
                  ))}
                  {value && (
                    <li
                      className="list-group-item w-100 text-danger text-center"
                      onMouseDown={() => { onChange(null); setText(''); setShow(false); }}
                      style={{ cursor: 'pointer' }}
                    >
                      Effacer la sélection
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
          );
        }}
      />
      {errors[field.id]?.message ? <p className="text-danger">{String(errors[field.id]?.message)}</p> : false}
    </>
  );
};
