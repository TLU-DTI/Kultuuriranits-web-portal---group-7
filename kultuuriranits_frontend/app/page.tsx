import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Avaleht</h1>
      <Link href="/programs">Programmid</Link>
      <br />
      <Link href="/programs/add">Lisa uus programm</Link>
    </main>
  )
}   