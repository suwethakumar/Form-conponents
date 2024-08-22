import React from 'react';
import * as Yup from 'yup';
import DynamicForm from './DynamicForm'; 

const ExampleForm = () => {
  const formConfig = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      initialValue: '',
      validation: Yup.string().required('Username is required'),
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      initialValue: '',
      validation: Yup.string().email('Invalid email format').required('Email is required'),
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
      validation: Yup.string().required('Gender is required'),
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      validation: Yup.date().required('Date of birth is required'),
    },
  ];

  const handleSubmit = values => {
    console.log('Form Submitted:', values);
  };

  return <DynamicForm config={formConfig} onSubmit={handleSubmit} />;
};

export default ExampleForm; // Default export
