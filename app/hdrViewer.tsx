"use client";

import { ComponentProps, useEffect, useRef } from "react";
import {
	ACESFilmicToneMapping,
	Mesh,
	MeshBasicMaterial,
	OrthographicCamera,
	PlaneGeometry,
	Scene,
	SRGBColorSpace,
	Texture,
	WebGLRenderer,
} from "three";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

export type HdrViewerProps = {
	src: string;
	/** CSS layout size in px; Three owns the canvas drawing buffer attributes. */
	width?: number;
	height?: number;
} & Omit<ComponentProps<"canvas">, "width" | "height">;

export function HdrViewer({ src, width, height, style, className, ...rest }: HdrViewerProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const scene = new Scene();
		const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
		camera.position.z = 1;

		const geometry = new PlaneGeometry(1, 1);
		const material = new MeshBasicMaterial({ toneMapped: true });
		const plane = new Mesh(geometry, material);
		scene.add(plane);

		const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false });
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.outputColorSpace = SRGBColorSpace;

		let loadedTexture: Texture | null = null;
		let canvasAspect = 1;
		let textureAspect = 1;
		let raf = 0;
		let alive = true;

		const updatePlaneScale = () => {
			if (textureAspect >= canvasAspect) {
				plane.scale.set(2 * canvasAspect, (2 * canvasAspect) / textureAspect, 1);
			} else {
				plane.scale.set(2 * textureAspect, 2, 1);
			}
		};

		const setSize = () => {
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			if (w < 1 || h < 1) return;
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			canvasAspect = w / h;
			camera.left = -canvasAspect;
			camera.right = canvasAspect;
			camera.top = 1;
			camera.bottom = -1;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h, true);
			updatePlaneScale();
		};

		setSize();
		const ro = new ResizeObserver(setSize);
		ro.observe(canvas);

		const loader = new HDRLoader();
		loader.load(
			src,
			(texture) => {
				if (!alive) {
					texture.dispose();
					return;
				}
				if (loadedTexture) {
					loadedTexture.dispose();
				}
				loadedTexture = texture;
				textureAspect = texture.image.width / texture.image.height;
				material.map = texture;
				material.needsUpdate = true;
				updatePlaneScale();
			},
			undefined,
			(err) => {
				console.error("HDRI load failed:", err);
			}
		);

		const frame = () => {
			raf = requestAnimationFrame(frame);
			renderer.render(scene, camera);
		};
		raf = requestAnimationFrame(frame);

		return () => {
			alive = false;
			cancelAnimationFrame(raf);
			ro.disconnect();
			if (loadedTexture) {
				loadedTexture.dispose();
			}
			material.dispose();
			geometry.dispose();
			renderer.dispose();
		};
	}, [src]);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{
				display: "block",
				maxWidth: "100%",
				...(width != null && height != null
					? { width, height, flexShrink: 0 }
					: undefined),
				...style,
			}}
			{...rest}
		/>
	);
}
