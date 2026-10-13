import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/composition-nutritionnelle/mineraux")({ component: MineralsLayout });

function MineralsLayout() {
  return <Outlet />;
}