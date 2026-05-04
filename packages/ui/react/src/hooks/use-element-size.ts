import { useLayoutEffect, useRef, useState } from "react";

export function useElementSize() {
	const [size, setSize] = useState({ width: 0, height: 0 });
	const observerRef = useRef<ResizeObserver | null>(null);

	const ref = (node: HTMLElement | null) => {
		observerRef.current?.disconnect();
		observerRef.current = null;

		if (!node) {
			setSize({ width: 0, height: 0 });
			return;
		}

		const rect = node.getBoundingClientRect();
		setSize({ width: rect.width, height: rect.height });

		const observer = new ResizeObserver(([entry]) => {
			const contentBoxSize = entry.contentBoxSize?.[0];
			if (contentBoxSize) {
				setSize({ width: contentBoxSize.inlineSize, height: contentBoxSize.blockSize });
			} else {
				const fallbackRect = entry.target.getBoundingClientRect();
				setSize({ width: fallbackRect.width, height: fallbackRect.height });
			}
		});

		observer.observe(node);
		observerRef.current = observer;
	};

	useLayoutEffect(() => {
		return () => {
			observerRef.current?.disconnect();
			observerRef.current = null;
		};
	}, []);

	return { ref, size };
}
