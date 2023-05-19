import Image from "next/image"
import { sections } from "../utils/sections"
import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex items-center">
          <Image
            src="/nyp.svg"
            alt="Logo"
            width={200}
            height={10}
            priority
          />
          <nav>
            <ul>
                {sections.map(section => (
                    <span className="px-[1.0rem]">
                        <Link href={`/sections${section.path}`}>{section.title}</Link>
                    </span>
                ))}
            </ul>
          </nav>
        </header>
    )
}