import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { runAdminMaintenance } from "../actions";

export const metadata: Metadata = {
  title: "Quản trị",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminContentProps = {
  searchParams: Promise<{ task?: string }>;
};

function AdminLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        Đang kiểm tra quyền quản trị...
      </div>
    </main>
  );
}

async function AdminContent({ searchParams }: AdminContentProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/403");
  }

  const { task } = await searchParams;
  const taskCompleted = task === "completed";

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
        <Link href="/" className="text-orange-600 hover:underline">
          ← Trang chủ
        </Link>

        <h1 className="mt-6 text-3xl font-bold">Quản trị hệ thống</h1>

        <p className="mt-3 text-gray-600">
          Khu vực dành cho quản trị viên quản lý sản phẩm.
        </p>

        {taskCompleted && (
          <div
            role="status"
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
          >
            <p className="font-semibold">Thao tác quản trị đã hoàn tất!</p>
            <p className="mt-1 text-sm">
              Yêu cầu demo đã được xử lý thành công.
            </p>
          </div>
        )}

        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>Tài khoản: {session.user.email ?? "Chưa có email"}</p>
          <p>Vai trò: {session.user.role}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">Tổng sản phẩm mẫu</p>
            <p className="mt-2 text-3xl font-bold">3</p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">Chức năng quản trị</p>
            <p className="mt-2 font-semibold">Quản lý sản phẩm</p>
          </div>
        </div>

        <form action={runAdminMaintenance} className="mt-8">
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-orange-700 px-5 py-3 font-semibold text-white hover:bg-orange-800"
          >
            Chạy thao tác quản trị demo
          </button>
        </form>

        <Link
          href="/dashboard"
          className="mt-6 inline-block text-orange-700 hover:underline"
        >
          Quay lại Dashboard
        </Link>
      </div>
    </main>
  );
}

export default async function AdminPage({ searchParams }: AdminContentProps) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminContent searchParams={searchParams} />
    </Suspense>
  );
}
