import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { StarBackground } from "../components/StarBackground";
import { CloudBackground } from "../components/CloudBackground";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Timeline data structure
const timelineEvents = [
	{
		year: "2023",
		title: "Data Analyst at ISR",
		description:
			"Started working as a Data Analyst at the Institute for Social Research (ISR).",
		category: "work",
	},
	{
		year: "2022",
		title: "Computer Science at York University",
		description:
			"Entered 4th year of Specialized Honours in Computer Science with a 3.9 GPA.",
		category: "education",
	},
    {
		year: "2023",
		title: "Data Analyst at ISR",
		description:
			"Started working as a Data Analyst at the Institute for Social Research (ISR).",
		category: "work",
	}
	// Add more events as needed
];

export const Timeline = () => {
	return (
		<div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
			{/* Background Effects - positioned with lower z-index */}
			<div className="fixed inset-0 z-0">
				<CloudBackground />
			</div>
			<div className="fixed inset-0 z-10">
				<StarBackground />
			</div>

			{/* Content with higher z-index */}
			<div className="relative z-20">
				{/* Navbar */}
				<NavBar />

				{/* Main Content */}
				<main className="container mx-auto max-w-4xl pt-32 px-4 pb-16">
					<div className="flex items-center mb-8 gap-4">
						<Link
							to="/"
							className="flex items-center gap-2 text-primary hover:underline"
						>
							<ArrowLeft size={20} />
							Back to Home
						</Link>
						<h1 className="text-3xl md:text-4xl font-bold">My Timeline</h1>
					</div>

					<div className="relative border-l-2 border-primary/50 pl-8 ml-4 space-y-10">
						{timelineEvents.map((event, index) => (
							<div key={index} className="relative">
								{/* Dot on timeline - outside the hover element */}
								<div className="absolute w-4 h-4 bg-primary rounded-full -left-[41px] top-6"></div>

								{/* Content with hover effect */}
								<div className="gradient-border card-hover p-6">
									<div className="flex flex-col md:flex-row justify-between gap-4">
										<div>
											<h3 className="text-xl font-bold">{event.title}</h3>
											<p className="text-muted-foreground">
												{event.description}
											</p>
										</div>
										<div className="md:text-right">
											<span className="text-primary font-semibold text-lg">
												{event.year}
											</span>
											<div className="inline-block ml-2 px-2 py-1 rounded-full bg-primary/20 text-xs">
												{event.category}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</main>

				{/* Footer */}
				<Footer />
			</div>
		</div>
	);
};