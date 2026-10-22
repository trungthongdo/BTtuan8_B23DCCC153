import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản TechStore.",
  robots: {
    index: false,
    follow: false,
  },
};

function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Đang tải trang đăng nhập...
      </div>
    </main>
  );
}

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm text-orange-700 hover:underline">
          ← Về trang chủ
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Đăng nhập</h1>
        <p className="mt-2 text-gray-600">
          Đăng nhập để truy cập tài khoản TechStore.
        </p>

        {params.error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.
          </p>
        )}

        <form
          className="mt-6 space-y-4"
          action={async (formData: FormData) => {
            "use server";

            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/dashboard",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                redirect("/login?error=CredentialsSignin");
              }

              throw error;
            }
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-600"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-600"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-700 px-4 py-3 font-semibold text-white hover:bg-orange-800"
          >
            Đăng nhập bằng email
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">Hoặc</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50"
          >
            Đăng nhập bằng GitHub
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}
