
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialMediaIconsProps {
  instagram?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  youtube?: string | null;
}

const SocialMediaIcons = ({ instagram, twitter, facebook, youtube }: SocialMediaIconsProps) => {
  const socialLinks = [
    { url: instagram, icon: Instagram, name: "Instagram", color: "hover:text-pink-400" },
    { url: twitter, icon: Twitter, name: "Twitter", color: "hover:text-blue-400" },
    { url: facebook, icon: Facebook, name: "Facebook", color: "hover:text-blue-600" },
    { url: youtube, icon: Youtube, name: "YouTube", color: "hover:text-red-500" }
  ].filter(link => link.url); // Only show links that have URLs

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-3">
      {socialLinks.map(({ url, icon: Icon, name, color }) => (
        <Button
          key={name}
          variant="ghost"
          size="icon"
          asChild
          className={`text-gray-400 ${color} transition-colors`}
        >
          <a 
            href={url!} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Visit ${name}`}
          >
            <Icon className="w-5 h-5" />
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
