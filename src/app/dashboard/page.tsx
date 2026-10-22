import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

function DashboardLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        Đang tải thông tin tài khoản...
      </div>
    </main>
  );
}

async function DashboardContent() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-4 text-gray-600">
          Xin chào, {session.user.name ?? session.user.email}!
        </p>

        <div className="mt-6 rounded-xl bg-blue-50 p-5">
          <h2 className="font-semibold">Thông tin tài khoản</h2>
          <p className="mt-2">
            Email: {session.user.email ?? "Chưa có email"}
          </p>
          <p className="mt-2">
            Vai trò: {session.user.role}
          </p>
        </div>

        {session.user.role === "admin" && (
          <Link
            href="/admin"
            className="mt-6 inline-block rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white"
          >
            Đi tới trang quản trị
          </Link>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="text-orange-600">
            Về trang chủ
          </Link>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="font-semibold text-red-600"
            >
              Đăng xuất
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
