import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";

export const source = loader({
	source: docs.toFumadocsSource(),
	baseUrl: "/docs",
	plugins: [lucideIconsPlugin()],
});

export function markdownPathToSlugs(segments: string[]) {
	if (segments.length === 0) return [];

	const slugs = [...segments];
	const last = slugs.at(-1);

	if (last) {
		slugs[slugs.length - 1] = last.replace(/\.md$/, "");
	}

	if (slugs.length === 1 && slugs[0] === "index") {
		slugs.pop();
	}

	return slugs;
}

export function slugsToMarkdownPath(slugs: string[]) {
	const segments = [...slugs];

	if (segments.length === 0) {
		segments.push("index.md");
	} else {
		segments[segments.length - 1] += ".md";
	}

	return {
		segments,
		url: `/docs/${segments.join("/")}`,
	};
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
	const processed = await page.data.getText("processed");

	return `# ${page.data.title} (${page.url})

${processed}`;
}
