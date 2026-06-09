import Link from "next/link";

export default function Home() {
  return (
    <main className="home-container">
      <h1>Kultuuriranits</h1>
      <div id="nav">
      <Link href="/programs">Programmid</Link>
      <br/>
      <Link href="/programs/add">Lisa uus programm</Link>
      <br/>
      <Link href="/signup">Registreerimine</Link>
      <br/>
      <Link href="/login">Sisselogimine</Link>
      </div>
    </main>
  )
};