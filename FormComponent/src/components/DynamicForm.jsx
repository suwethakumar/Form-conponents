import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './DynamicForm.css';

const InputField = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input {...props} className="form-control" />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <select {...props} className="form-control">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const DatePickerField = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="date" {...props} className="form-control" />
  </div>
);

const DynamicForm = ({ config, onSubmit }) => {
  const formik = useFormik({
    initialValues: config.reduce((acc, field) => {
      acc[field.name] = field.initialValue || '';
      return acc;
    }, {}),
    validationSchema: Yup.object().shape(
      config.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {})
    ),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {config.map(field => {
        switch (field.type) {
          case 'text':
            return (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type="text"
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            );
          case 'select':
            return (
              <SelectField
                key={field.name}
                label={field.label}
                name={field.name}
                options={field.options}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            );
          case 'date':
            return (
              <DatePickerField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            );
          default:
            return null;
        }
      })}
      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={formik.handleReset}>Reset</button>
    </form>
  );
};

DynamicForm.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      initialValue: PropTypes.any,
      validation: PropTypes.object,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.any.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DynamicForm;
