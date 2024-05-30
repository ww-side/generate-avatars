import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex, Form, Input, message, Spin, Typography } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { useSetAtom } from 'jotai';
import { signIn } from '@api/sign-in';
import { signUp } from '@api/sign-up';
import { useCookie } from '@hooks/useCookie';
import { authorizedAtom, usernameAtom } from '@store/user';
import { passwordValidation } from '@utils/validators/password-validation';
import { usernameSchema } from '@utils/validators/username.schema';
import { httpErrorHandler } from '@utils/http-error-handler';
import st from './auth-form.module.scss';
import { useState } from 'react';

export default function AuthForm({
  variant,
}: {
  variant: 'signIn' | 'signUp';
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUsername = useSetAtom(usernameAtom);
  const setIsAuthorized = useSetAtom(authorizedAtom);
  const { setCookie } = useCookie();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      let res: any;

      if (variant === 'signIn') {
        res = await signIn({
          username: values.username,
          password: values.password,
        });
      }

      if (variant === 'signUp') {
        res = await signUp({
          username: values.username,
          password: values.password,
        });
        console.log('@sign up res', res);
      }

      if (res.data.error) {
        await message.error(res.data.error);
        return;
      }

      setCookie('token', res.data.token);
      setCookie('username', values.username);
      setUsername(values.username);
      setIsAuthorized(true);
      navigate('/');
      console.log(res);
    } catch (e) {
      await httpErrorHandler(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={st.sectionWrapper}>
      <div className={st.authFormContainer}>
        <Form
          initialValues={{
            username: '',
            password: '',
          }}
          onFinish={onFinish}
        >
          <Flex vertical className={st.authForm}>
            <Typography.Title level={3}>
              {variant === 'signIn' ? 'Sign in!' : 'Sign up!'}
            </Typography.Title>
            <Form.Item name="username" rules={usernameSchema}>
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator: async (_, value) => {
                    passwordValidation(value);
                  },
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Button size="large" htmlType="submit" className={st.button}>
              {isLoading ? (
                <Spin />
              ) : variant === 'signIn' ? (
                'Sign In Now'
              ) : (
                'Create an account'
              )}
            </Button>
          </Flex>
        </Form>
        {variant === 'signIn' ? (
          <Typography.Paragraph>
            Haven't created an account yet?
            <Link to="/sign-up" className={st.alternativeVariant}>
              Sign up!
            </Link>
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph>
            Already have an account?
            <Link to="/sign-in" className={st.alternativeVariant}>
              Sign in!
            </Link>
          </Typography.Paragraph>
        )}
      </div>
    </section>
  );
}
