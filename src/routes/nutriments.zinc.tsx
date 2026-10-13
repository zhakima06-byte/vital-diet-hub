import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/nutriments/zinc")({
  beforeLoad: () => {
    throw redirect({ to: "/composition-nutritionnelle/mineraux/zinc", statusCode: 301 });
  },
});