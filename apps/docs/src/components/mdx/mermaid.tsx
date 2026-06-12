import { renderMermaidSVG } from "beautiful-mermaid";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

type MermaidProps = {
	chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
	try {
		const svg = renderMermaidSVG(chart, {
			bg: "var(--color-fd-background)",
			fg: "var(--color-fd-foreground)",
			interactive: true,
			transparent: true,
		});

		return (
			<div
				className="my-6 overflow-x-auto rounded-md border bg-fd-card p-4"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Fumadocs recommends rendering Mermaid's generated SVG this way.
				dangerouslySetInnerHTML={{ __html: svg }}
			/>
		);
	} catch {
		return (
			<CodeBlock title="Mermaid">
				<Pre>{chart}</Pre>
			</CodeBlock>
		);
	}
}
