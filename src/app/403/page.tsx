import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-orange-600">403</p>

        <h1 className="mt-5 text-2xl font-bold">Bạn không có quyền truy cập</h1>

        <p className="mt-3 text-gray-600">
          Tài khoản của bạn không có quyền quản trị khu vực này.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
