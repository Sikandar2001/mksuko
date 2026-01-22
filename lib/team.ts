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
    id: "ana-smith",
    name: "Ana Smith",
    role: "CEO",
    description: "Ana leads the agency with strategic insight.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    socials: {
      youtube: "#",
      instagram: "#",
      facebook: "#"
    },
    bio: "With over 15 years of experience in digital strategy and leadership, Ana has guided MKSUKO from a boutique studio to a global creative powerhouse. Her vision combines artistic excellence with business acumen.",
    skills: ["Strategy", "Leadership", "Business Development", "Brand Vision"]
  },
  {
    id: "john-doe",
    name: "John Doe",
    role: "DESIGNER",
    description: "John brings brands to life with his artistic vision.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    socials: {
      youtube: "#",
      instagram: "#",
      facebook: "#"
    },
    bio: "John is an award-winning designer with a passion for minimalism and typography. He believes that good design is invisible and great design is unforgettable.",
    skills: ["UI/UX", "Typography", "Motion Design", "Art Direction"]
  },
  {
    id: "jane-white",
    name: "Jane White",
    role: "ANALYST",
    description: "Innovative thinking, turning ideas into real results.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    socials: {
      youtube: "#",
      instagram: "#",
      facebook: "#"
    },
    bio: "Jane translates complex data into actionable insights. Her analytical approach ensures that every creative decision is backed by solid evidence and user behavior metrics.",
    skills: ["Data Analysis", "User Research", "Market Strategy", "Growth Hacking"]
  },
];
