// src/features/auth/pages/LoginPage.tsx

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { notify } from "@/lib/notify";

import { FormInput } from "@/components/forms/FormInput";
import { useAuthStore } from "@/store/auth-store";

import { useLogin } from "../hooks/useLogin";
import type { ILoginPayload } from "../types/auth.types";
import { appPaths } from "@/app/router/paths";
import { FormPasswordInput } from "@/components/forms/FormPasswordInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (values: ILoginPayload) => {
    login(values, {
      onSuccess: (response) => {
        setAuth({
          token: response.data.token,
          user: response.data.user,
        });

        notify.success(response.message || "Login successful");
        navigate(appPaths.dashboard, {
          replace: true,
        });
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#f8f5fc]">
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-2xl border border-[#e2e4e9] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#9244d4] text-xl font-semibold text-white">
              SK
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              SimKash Admin
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Enter your admin credentials to continue.
            </p>
          </div>

          <Form<ILoginPayload>
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
          >
            <FormInput
              name="email"
              label="Email address"
              required
              size="large"
              autoComplete="email"
              placeholder="admin@simkash.com"
              prefix={<MailOutlined className="text-gray-400" />}
              rules={[
                {
                  type: "email",
                  message: "Enter a valid email address",
                },
              ]}
            />

            <FormPasswordInput
              name="password"
              label="Password"
              required
              size="large"
              autoComplete="current-password"
              placeholder="Enter your password"
              prefix={<LockOutlined className="text-gray-400" />}
            />

            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
              loading={isPending}
              disabled={isPending}
              className="mt-2"
            >
              Sign in
            </Button>
          </Form>
        </section>
      </div>
    </main>
  );
}
