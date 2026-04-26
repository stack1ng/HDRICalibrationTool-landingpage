import Image from "next/image";
import { HdrViewer } from "./hdrViewer";
import Link from "next/link";

const currentTeam = [
	{ name: "Tom Eaton", handle: "stack1ng" },
	{ name: "Joel Fief", handle: "jfief22" },
	{ name: "Riho Kaneta", handle: "Leona0727" },
];

const pastContributors = [
	{ name: "klumpn", handle: "klumpn" },
	{ name: "shantimorrell", handle: "shantimorrell" },
	{ name: "Emmitt Carter", handle: "emmseth" },
	{ name: "stack461", handle: "stack461" },
	{ name: "Samuel", handle: "Gwaslol1" },
	{ name: "Alex Ulbrich", handle: "adulbrich" },
	{ name: "Artin Lahni", handle: "ArtinL" },
	{ name: "Colin Cone", handle: "Coneco629" },
	{ name: "zimmermannliam", handle: "zimmermannliam" },
	{ name: "Xiangyu Joey", handle: "XiangyuLijoey" },
	{ name: "BP_", handle: "zwall-bp" },
	{ name: "Lou", handle: "hpfluke0478" },
];

export default function Home() {
	const inputExamples = [
		"/sample/inputs/JPEG/IMG_6955.jpg",
		"/sample/inputs/JPEG/IMG_6956.jpg",
		"/sample/inputs/JPEG/IMG_6957.jpg",
		"/sample/inputs/JPEG/IMG_6958.jpg",
		"/sample/inputs/JPEG/IMG_6959.jpg",
		"/sample/inputs/JPEG/IMG_6960.jpg",
		"/sample/inputs/JPEG/IMG_6961.jpg",
		"/sample/inputs/JPEG/IMG_6962.jpg",
		"/sample/inputs/JPEG/IMG_6963.jpg",
		"/sample/inputs/JPEG/IMG_6964.jpg",
		"/sample/inputs/JPEG/IMG_6965.jpg",
		"/sample/inputs/JPEG/IMG_6966.jpg",
		"/sample/inputs/JPEG/IMG_6967.jpg",
		"/sample/inputs/JPEG/IMG_6968.jpg",
		"/sample/inputs/JPEG/IMG_6969.jpg",
		"/sample/inputs/JPEG/IMG_6970.jpg",
		"/sample/inputs/JPEG/IMG_6971.jpg",
		"/sample/inputs/JPEG/IMG_6972.jpg",
	];
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="px-6 py-16">
				<h1 className="text-6xl font-bold flex items-center gap-2">
					<Image src="/logo.png" alt="Logo" width={50} height={50} />
					HDRI Calibration Interface
				</h1>
				<p className="pb-16">
					This is a tool for creating and analyzing calibrated HDR images from a
					set of LDR images and some camera infromation.
				</p>
				<section>
					<h1 className="text-4xl font-bold pb-8">
						Create a Calibrated HDR Image
					</h1>
					<div className="flex items-center">
						<div className="grid grid-cols-3 w-[300px]">
							{inputExamples.map((example) => (
								<Image
									key={example}
									src={example}
									alt="Example"
									width={100}
									height={100}
								/>
							))}
						</div>
						<div className="font-bold text-6xl">{"->"}</div>
						<HdrViewer
							width={300}
							height={300}
							src="/sample/outputs/JPEG_output_falsecolor.hdr"
						/>
						<HdrViewer
							width={300}
							height={300}
							src="/sample/outputs/JPEG_output_pipeline.hdr"
						/>
					</div>
					<Link
						href="https://github.com/radiantlab/HDRICalibrationTool"
						target="_blank"
						rel="noreferrer"
						className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500"
					>
						<svg
							aria-hidden="true"
							className="size-5"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 2C6.477 2 2 6.59 2 12.253c0 4.529 2.865 8.371 6.839 9.728.5.095.683-.222.683-.494 0-.244-.009-.89-.014-1.747-2.782.619-3.369-1.376-3.369-1.376-.455-1.185-1.11-1.501-1.11-1.501-.908-.636.069-.623.069-.623 1.004.073 1.532 1.057 1.532 1.057.892 1.566 2.341 1.114 2.91.852.091-.662.349-1.114.635-1.37-2.221-.259-4.555-1.138-4.555-5.064 0-1.118.39-2.032 1.03-2.748-.103-.259-.446-1.302.098-2.713 0 0 .84-.276 2.75 1.05A9.421 9.421 0 0 1 12 6.98a9.42 9.42 0 0 1 2.504.345c1.909-1.326 2.747-1.05 2.747-1.05.546 1.411.203 2.454.1 2.713.64.716 1.028 1.63 1.028 2.748 0 3.936-2.338 4.802-4.566 5.056.359.317.679.943.679 1.901 0 1.372-.012 2.478-.012 2.814 0 .274.18.594.688.493C19.138 20.62 22 16.78 22 12.253 22 6.59 17.523 2 12 2Z"
							/>
						</svg>
						View on GitHub
					</Link>
				</section>
				<section className="mx-auto mt-16 max-w-4xl rounded-3xl p-8">
					<div className="text-center">
						<h2 className="text-5xl font-bold">Contributors</h2>
					</div>
					<div className="mt-8 grid gap-8 md:grid-cols-[1fr_2fr]">
						<div>
							<h3 className="text-lg font-semibold">Current Team</h3>
							<ul className="mt-4 space-y-3">
								{currentTeam.map((member) => (
									<Link
										key={member.handle}
										className="flex items-center gap-2"
										href={`https://github.com/${member.handle}`}
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src={`https://github.com/${member.handle}.png`}
											alt={member.name}
											className="rounded-full"
											width={16}
											height={16}
										/>
										{member.name}
									</Link>
								))}
							</ul>
						</div>
						<div>
							<h3 className="text-lg font-semibold">Past Contributors</h3>
							<div className="mt-4 flex flex-wrap gap-3">
								{pastContributors.map((contributor) => (
									<Link
										key={contributor.handle}
										className="flex items-center gap-2"
										href={`https://github.com/${contributor.handle}`}
										target="_blank"
										rel="noreferrer"
									>
										<Image
											src={`https://github.com/${contributor.handle}.png`}
											alt={contributor.name}
											className="rounded-full"
											width={16}
											height={16}
										/>
										{contributor.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
