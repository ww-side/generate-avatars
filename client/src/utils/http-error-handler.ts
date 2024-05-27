import { message } from 'antd';

export async function httpErrorHandler(err: unknown) {
  if (err instanceof Error) {
    await message.error(err.message);
  } else {
    await message.error(
      'Could not connect to the server. Please wait a few minutes and try again.',
    );
  }
}
