import Image from "next/image";
import GithubImg from "~/assets/images/github.svg";

function Footer() {
  return (
    <div className="py-3 text-center">
      <a href="https://github.com/Debbl/hugging-face-nextjs/">
        <Image className="inline-block" alt="github" src={GithubImg} />
      </a>
    </div>
  );
}

export default Footer;
