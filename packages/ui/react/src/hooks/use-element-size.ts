import { type RefObject, useLayoutEffect, useState } from "react";

export function useElementSize(ref: RefObject<HTMLElement | null>) {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new ResizeObserver(([entry]) => {
			setSize({
				width: entry.contentBoxSize[0].inlineSize,
				height: entry.contentBoxSize[0].blockSize,
			});
		});
		observer.observe(el);

		return () => observer.disconnect();
	}, [ref]);

	return size;
}
