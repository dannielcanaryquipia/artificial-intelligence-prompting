export interface SocialLink {
  id: "facebook" | "instagram" | "github" | "linkedin" | "email";
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danniel-canary-quipia-121bb6416/",
  },
  { id: "github", label: "GitHub", href: "https://github.com/dannielcanaryquipia" },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/danniel.canary.quipia.2024",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/anonymous.14b36",
  },
  {
    id: "email",
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=dannielcanaryq@gmail.com&su=Hello%20from%20the%20Prompting%20101%20site",
  },
];

export const projectGithubUrl = "https://github.com/dannielcanaryquipia/artificial-intelligence-prompting";

import qrCodeImage from "@/assets/qr-code/qrforever-url-1788595950456.png";

export const qrImageUrl = qrCodeImage;
export const qrCaption = "Scan to open the lesson";