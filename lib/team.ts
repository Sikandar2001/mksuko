export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  socials: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  bio?: string;
  skills?: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "rajkumar-rajbhar",
    name: "RAJKUMAR RAJBHAR",
    role: "DIRECTOR",
    description: "Rajkumar leads the agency with strategic insight.",
    image: "/image/directer.png",
    socials: {
      youtube: "#",
      instagram: "#",
      facebook: "#"
    },
    bio: "With over 15 years of experience in digital strategy and leadership, Rajkumar has guided MKSUKO from a boutique studio to a global creative powerhouse. His vision combines artistic excellence with business acumen.",
    skills: ["Strategy", "Leadership", "Business Development", "Brand Vision"]
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "MANAGER",
    description: "Driving operational excellence and team synergy.",
    image: "/image/avs.png",
    socials: {
      youtube: "#",
      instagram: "#",
      facebook: "#"
    },
    bio: "Priya brings over 10 years of experience in operations management. Her ability to streamline processes and foster a collaborative environment has been key to our team's success.",
    skills: ["Operations", "Team Management", "Process Optimization", "Client Relations"]
  },
  {
    id: "amit-kumar",
    name: "Amit Kumar",
    role: "FIELD OFFICER",
    description: "Dedicated to on-ground execution and community engagement.",
    image: "/image/www.png",
    socials: {
      youtube: "#",
      instagram: "#",
      facebook: "#"
    },
    bio: "Amit is the boots on the ground, ensuring that our projects are executed with precision and care. His connection with the community is unmatched.",
    skills: ["Field Operations", "Community Engagement", "Logistics", "Project Execution"]
  }
];
