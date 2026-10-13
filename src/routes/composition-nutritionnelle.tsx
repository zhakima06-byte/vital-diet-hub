import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/composition-nutritionnelle")({ component: CompositionLayout });

function CompositionLayout() {
  return <Outlet />;
}