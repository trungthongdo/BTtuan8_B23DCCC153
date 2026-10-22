"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function runAdminMaintenance() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/403");
  }

  redirect("/admin?task=completed");
}
