'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActionBtn(){
    const pathname = usePathname();
console.log(pathname)
    return(
        <Link href={`${pathname}/agendar`}>
            clique aqui para agendar
        </Link>
    )
}