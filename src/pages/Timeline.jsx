
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Timeline data structure
const timelineEvents = [
	{
		year: "July 2025",
		title: "Hack the 6ix - Hackathon",
		description:
			"I supported hackathon operations by managing check-ins, guiding participants, ensuring safety, and assisting with event logistics for a seamless experience.",
		category: "Extracurricular",
	},
	{
		year: "April 2025",
		title: "Data Analyst - ISR",
		description:
			"I worked as a Data Analyst, performing data collection, cleaning, and statistical analysis to identify trends, generate actionable insights, and support data-driven decision-making through visualizations and reports.",
		category: "Experience",
	},
	{
		year: "January 2025",
		title: "Smart Recipe - Frontend",
		description:
			"I created Smart Recipe, a recipe assistant application that generates personalized recipes from photos or ingredients, offers meal planning, integrates with grocery stores, and supports social sharing to reduce food waste and enhance cooking experiences.",
		category: "Project",
	},
	{
		year: "September 2024",
		title: "Fit Coach - Fullstack",
		description:
			"I developed a fitness coaching app that provides personalized workout plans and nutrition tracking.",
		category: "Project",
	},
	{
		year: "April 2024",
		title: "AI Emotion Prediction Model - Research",
		description:
			"I created an AI-driven emotion prediction model by fine-tuning GPT-2 on the Daily Dialogue dataset to forecast the next emotion in a conversation based on text input.",
		category: "Experience",
	},
	{
		year: "December 2023",
		title: "Learning Linux Shell Scripting",
		description:
			"I earned a Certificate of Completion in Learning Linux Shell Scripting, showcasing my ability to write, automate, and manage tasks using shell scripts in a Linux environment.",
		category: "Education",
	},
	{
		year: "November 2023",
		title: "Learning Linux Command Line",
		description:
			"I earned a Certificate of Completion in Learning Linux Command Line, demonstrating proficiency in navigating, managing files, and executing commands within the Linux environment.",
		category: "Education",
	},
	{
		year: "October 2023",
		title: "A+i Learning - Fullstack",
		description:
			"I created A+i Learning during UNHack 2023, an AI-powered learning platform designed to personalize education by providing adaptive content and interactive resources for an engaging learning experience.",
		category: "Project",
	},
	{
		year: "August 2023",
		title: "Mind Maze - Game Development",
		description:
			"I created MindMaze, an educational adventure game built with Unity that combines fun and learning by challenging players with mathematics, logic, and computer science puzzles in a vibrant, interactive maze.",
		category: "Project",
	},
	{
		year: "June 2023",
		title: "Platformer - Game Development",
		description:
			"I created a classic 2D platformer game where players choose unique characters to explore levels, collect fruits, and avoid traps with responsive controls and vibrant animations.",
		category: "Project",
	},
	{
		year: "April 2023",
		title: "Jarvis Ambassador",
		description:
			"I served as a Jarvis Student Ambassador, promoting the company at York University by organizing career fairs and events to connect students with IT job opportunities.",
		category: "Extracurricular",
	},
	{
		year: "March 2023",
		title: "Open House - Organizer",
		description:
			"I helped organize a York University open house for Computer Science and Engineering students, ensuring smooth execution and providing key information on programs and opportunities.",
		category: "Extracurricular",
	},
	{
		year: "November 2022",
		title: "Private Tutor",
		description:
			"Tutored over 100 students from high-school to university level, specializing in math, sciences, computer science, and robotics, with guidance in coursework and test preparation.",
		category: "Experience",
	},
	{
		year: "September 2022",
		title: "York University - Computer Science",
		description:
			"I am pursuing a Bachelor of Science in Computer Science at the Lassonde School of Engineering, York University (Sep 2022 - Apr 2026), developing strong skills in programming, problem-solving, and analytical thinking, along with experience in public relations, social media, and additional technical competencies.",
		category: "Education",
	},
	
];


export const Timeline = () => {
  const categories = [
	{ name: "Extracurricular", color: "#6366f1" }, // indigo
	{ name: "Experience", color: "#10b981" }, // emerald
	{ name: "Project", color: "#f59e42" }, // orange
	{ name: "Education", color: "#f43f5e" }, // rose
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Only show events matching selected categories, or all if none selected
  const filteredEvents =
	selectedCategories.length === 0
	  ? timelineEvents
	  : timelineEvents.filter((event) =>
		  selectedCategories.includes(event.category)
		);

  const handleCategoryClick = (category) => {
	setSelectedCategories((prev) => {
	  if (prev.includes(category)) {
		return prev.filter((c) => c !== category);
	  } else {
		return [...prev, category];
	  }
	});
  };

  const handleAllClick = () => setSelectedCategories([]);

  return (
	<PageTransition className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
	  {/* Content with higher z-index */}
	  <div className="relative z-20">
		{/* Navbar */}
		<NavBar />

		{/* Main Content */}
		<main className="container mx-auto max-w-4xl pt-32 px-2 md:px-4 pb-16">
		  <div className="flex items-center mb-8 gap-4">
			<h1 className="text-3xl md:text-4xl font-bold">My Timeline</h1>
		  </div>

		  {/* Category Filter Buttons */}
		  <nav aria-label="Filter timeline by category" className="flex flex-row md:flex-col fixed right-2 md:right-8 top-24 md:top-40 z-30 gap-2 md:gap-4">
			<button
			  onClick={handleAllClick}
			  className={`px-4 py-2 rounded-full border-2 font-semibold shadow-md focus:outline-none hover:scale-110 transition-all ${selectedCategories.length === 0 ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}
			  aria-pressed={selectedCategories.length === 0}
			>
			  All
			</button>
			{categories.map((cat) => {
			  const isSelected = selectedCategories.includes(cat.name);
			  return (
				<button
				  key={cat.name}
				  onClick={() => handleCategoryClick(cat.name)}
				  style={{
					backgroundColor: isSelected ? cat.color : "#fff",
					color: isSelected ? "#fff" : cat.color,
					borderColor: cat.color,
					transition: 'all 0.2s',
				  }}
				  className={`px-4 py-2 rounded-full border-2 font-semibold shadow-md focus:outline-none hover:scale-110`}
				  aria-pressed={isSelected}
				  onMouseEnter={e => {
					if (!isSelected) {
					  e.currentTarget.style.backgroundColor = cat.color;
					  e.currentTarget.style.color = '#fff';
					}
				  }}
				  onMouseLeave={e => {
					if (!isSelected) {
					  e.currentTarget.style.backgroundColor = '#fff';
					  e.currentTarget.style.color = cat.color;
					}
				  }}
				>
				  {cat.name}
				</button>
			  );
			})}
		  </nav>

		  <section aria-label="Timeline" className="relative border-l-2 border-primary/50 pl-8 ml-4 space-y-10 mt-8">
			<ul className="space-y-10">
			  {filteredEvents.map((event, index) => {
				// Find the color for the event's category
				const cat = categories.find(c => c.name === event.category);
				const tagColor = cat ? cat.color : "#6366f1";
				return (
				  <li key={index} className="relative animate-fadeIn" style={{animationDelay: `${index * 60}ms`, animationFillMode: 'both'}}>
					{/* Dot on timeline - outside the hover element */}
					<span className="absolute w-4 h-4 bg-primary rounded-full -left-[41px] top-6" aria-hidden="true"></span>

					{/* Content with hover effect */}
					<article className="gradient-border card-hover p-6" tabIndex={0} aria-labelledby={`event-title-${index}`}> 
					  <div className="flex flex-col md:flex-row justify-between gap-4 text-left">
						<div className="text-left">
						  <h2 id={`event-title-${index}`} className="text-xl font-bold text-left">{event.title}</h2>
						  <p className="text-muted-foreground text-left">
							{event.description}
						  </p>
						</div>
						<div className="md:text-right text-left flex flex-col md:items-end items-start gap-2">
						  <span className="text-primary font-semibold text-lg">
							{event.year}
						  </span>
						  <span
							className="inline-block ml-0 md:ml-2 px-2 py-1 rounded-full text-xs"
							style={{
							  backgroundColor: tagColor,
							  color: "#fff",
							}}
						  >
							{event.category}
						  </span>
						</div>
					  </div>
					</article>
				  </li>
				);
			  })}
			</ul>
			{filteredEvents.length === 0 && (
			  <div className="text-center text-muted-foreground py-8">No events found for selected categories.</div>
			)}
		  </section>
		</main>

		{/* Footer */}
		<Footer />
	  </div>

	  {/* Fade-in animation keyframes */}
	  <style>{`
		@keyframes fadeIn {
		  from { opacity: 0; transform: translateY(20px); }
		  to { opacity: 1; transform: none; }
		}
		.animate-fadeIn {
		  animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
		}
		@media (max-width: 768px) {
		  nav[aria-label='Filter timeline by category'] {
			position: static !important;
			flex-direction: row !important;
			margin-bottom: 1.5rem;
			gap: 0.5rem !important;
		  }
		  section[aria-label='Timeline'] {
			margin-left: 0 !important;
			padding-left: 1.5rem !important;
		  }
		}
	  `}</style>
	</PageTransition>
  );
};