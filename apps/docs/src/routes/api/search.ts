import { createFileRoute } from "@tanstack/react-router";
import { createFromSource } from "fumadocs-core/search/server";
import { source } from "#/libs/source";

const server = createFromSource(source, {
	language: "french",
});

export const Route = createFileRoute("/api/search")({
	server: {
		handlers: {
			GET: () => server.staticGET(),
		},
	},
});
