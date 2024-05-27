export function passwordValidation(value: string) {
  if (!value) {
    throw new Error('Please enter your password!');
  }
  if (value.length < 9) {
    throw new Error('Password must be at least 9 characters!');
  }

  if (!/(?=.*[a-z])/.test(value)) {
    throw new Error('Password must contain at least one lowercase letter!');
  }

  if (!/(?=.*[A-Z])/.test(value)) {
    throw new Error('Password must contain at least one uppercase letter!');
  }

  if (!/(?=.*\d)/.test(value)) {
    throw new Error('Password must contain at least one digit!');
  }

  if (!/(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>/?])/.test(value)) {
    throw new Error('Password must contain at least one special character!');
  }
}
