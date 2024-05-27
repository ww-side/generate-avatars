export const usernameSchema = [
  {
    required: true,
    message: 'Please enter your username!',
  },
  {
    min: 4,
    message: 'Username must be at least 4 characters!',
  },
];
