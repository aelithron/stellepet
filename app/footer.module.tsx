import Image from "next/image";
import notByAI from "@/public/not-by-ai.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="justify-between p-4 md:px-8 flex gap-4 align-middle">
      <a href="https://github.com/aelithron/stellepet" target="_blank" className="text-slate-500 hover:text-sky-500 gap-1 flex items-center">
        <FontAwesomeIcon icon={faGithub} />
        <u>Source</u>
      </a>
      <a href="https://notbyai.fyi" target="_blank"><Image src={notByAI} alt="Not by AI" /></a>
    </footer>
  )
} 