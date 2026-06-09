import Link from "next/link";
import { HeroCarousel } from '../components/home/HeroCarousel';
import { CategoryCarousel } from '../components/home/CategoryCarousel';
import { HowItWorks } from '../components/home/HowItWorks';
// import { PopularPrograms } from '../components/home/PopularPrograms';
import { UserRoles } from '../components/home/UserRoles';

export default function Home() {
  return (
    <main>
      <h1>Kultuuriranits</h1>
      <div id="nav" />
        <Link href="/programs">Kultuuriprogrammid</Link>
        <br />
        <Link href="/programs/add">Lisa uus programm</Link>
        <br />
        <Link href="/signup">Registreerimine</Link>
        <br />
        <Link href="/login">Logi sisse</Link>

      <div className="flex flex-col" />
      {/* Hero Section - Full Width */}
      <HeroCarousel />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" />
          {/* Categories Section */}
          <CategoryCarousel />

          {/* How It Works Section */}
          <HowItWorks />

          {/* For Whom Section */}
          <UserRoles />

          {/* Popular Programs Section */}
          {/* <PopularPrograms /> */}
    </main>
  );
}