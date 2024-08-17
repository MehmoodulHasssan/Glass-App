import React from 'react';
import toast from 'react-hot-toast';

const validiateData = (data) => {
  const { username, email, password, phone, gender } = data;
  if (password.length < 8) {
    toast.error('Password must be at least 8 characters long.');
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error('Invalid email format. Please enter a valid email address.');
    return false;
  }
  if (!username) {
    toast.error('Username cannot be empty.');
    return false;
  } else if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
    toast.error(
      'Username can only contain letters, numbers, underscores, and periods.'
    );
    return false;
  }
  const validGenders = ['Male', 'Female'];
  if (!validGenders.includes(gender)) {
    toast.error('Invalid gender. Please select "Male", or "Female"');
    return false;
  }
  if (!/^\d{10,}$/.test(phone)) {
    toast.error('Phone number must be numeric and at least 10 digits long.');
    return false;
  }

  return true;
};

export default validiateData;
