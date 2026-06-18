# Kultuuriranits

## Projekti kirjeldus

**Kultuuriranits** on veebirakendus, mille eesmärk on koondada Eesti kultuurihariduse programmid ühte kesksesse keskkonda. Rakendus aitab õpetajatel leida sobivaid kultuuriprogramme, õppematerjale ja õppekäike ning võimaldab kultuuriasutustel oma programme mugavalt hallata. Platvorm vähendab info killustatust, lihtsustab programmide otsimist ja filtreerimist ning toetab koolide ja kultuuriasutuste vahelist koostööd.

Projekt valmis **Tallinna Ülikooli Digitehnoloogiate instituudi** õppeaine **IFI6231.DT Tarkvaraarenduse projekt ehk suvepraktika** raames.

> **Märkus:** tegemist on ülikooli projekti raames loodud prototüübiga. Rakendus ei ole ametlik riiklik teenus ega lõplikult kasutusele võetud portaal.

---

## Töötav rakendus

Töötava rakenduse link:

```txt
LISA SIIA VEEBIAADRESS
```

## Põhifunktsionaalsus

Rakenduses on kolm peamist kasutajarolli: **õpetaja**, **kultuuriasutus** ja **administraator**.

### Õpetaja

Õpetaja saab:

- sirvida kultuuriprogramme;
- otsida ja filtreerida programme;
- vaadata programmi detailvaadet;
- lisada programme lemmikutesse;
- vaadata õppematerjale;
- anda programmidele tagasisidet.

### Kultuuriasutus

Kultuuriasutus saab:

- lisada uusi kultuuriprogramme;
- muuta enda programme;
- muuta programmi avalikustamise olekut;
- lisada programmidele kaanefotosid ja õppematerjale;
- vaadata enda programmidele jäetud tagasisidet;
- näha statistikat enda programmide kohta;
- saada ja hallata teavitusi.

### Administraator

Administraator saab:

- vaadata süsteemi üldstatistikat;
- hallata kasutajaid;
- hallata programme;
- otsida, filtreerida ja sorteerida kasutajaid ning programme;
- jälgida süsteemi kontrollnäitajaid;
- kustutada vajadusel sobimatut sisu.

---

## Tehnoloogiad

### Frontend

Frontend asub kaustas:

```txt
kultuuriranits_frontend
```

Kasutatud tehnoloogiad:

| Tehnoloogia | Versioon |
|---|---:|
| Next.js | ^16.2.9 |
| React | 19.2.4 |
| React DOM | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| Lucide React | ^1.17.0 |
| Recharts | ^3.8.1 |
| Embla Carousel React | ^8.6.0 |
| React Icons | ^5.6.0 |
| EmailJS Browser | ^4.4.1 |

### Backend

Backend asub kaustas:

```txt
kultuuriranits_backend
```

Kasutatud tehnoloogiad:

| Tehnoloogia | Versioon |
|---|---:|
| Java | 25 |
| Spring Boot | 4.0.6 |
| Spring Web MVC | 4.0.6 |
| Spring Security | 4.0.6 |
| Spring Data JPA | 4.0.6 |
| Spring JDBC | 4.0.6 |
| Maven | — |
| Lombok | — |
| MySQL Connector/J | runtime |
| H2 Database | runtime |
| Java Personal Code | 1.6 |

### Andmebaas

Projekt kasutab arenduskeskkonnas MySQL/MariaDB andmebaasi.

Vaikimisi andmebaasi nimi:

```txt
kultuuriranits_db
```

---

## Projekti struktuur

```txt
Kultuuriranits-web-portal---group-7/
├── kultuuriranits_frontend/      # Next.js frontend
├── kultuuriranits_backend/       # Spring Boot backend
├── docs/                         # README pildid ja lisadokumendid
├── LICENSE
├── PAEVIK.md
└── README.md
```

---


## Ekraanipilt

![Kultuuriranitsa ekraanipilt](./docs/kultuuriranits_homepage.png)

---

## Autorid

Projekti autorid:

- Raimond Lige
- Kevin Lillemets
- Karel Reose
- Janari Altdorf
- Lisette Reins

---

## Litsents

Projektis on kasutusel **CC0 1.0 Universal** litsents.

Vaata täpsemalt failist:

```txt
LICENSE
```

---

## Staatus

Projekt valmis Tallinna Ülikooli suvepraktika raames prototüübina. Rakendus demonstreerib Kultuuriranitsa portaali võimalikku toimimist ning vajab päriskasutusse võtmiseks täiendavat arendust, turvaülevaatust, testimist ja sisulist kooskõlastamist.
