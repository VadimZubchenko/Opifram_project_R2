# Opifram_project_R2

## Projektin tavoitteet.

1. Helppokäyttöinen verkkokaupan sovellus
2. Tervetulosivu (sisäänpääsy joko myynti- tai admin sivulle)
3. Myyntisivu tuotteiden tilaukseen (nimi, määrä, hinta, loppusumma, kori, tilaajan tiedot)
4. Admin sivu (sisäänkirjautuminen, tuotteiden lisääminen, lompakko)
5. Yhteinen tietokanta

## Rakenne alustavasti

User

- user id: string
- firstName: string
- lastName: string
- address: string
- phone: string
- email: string
- role: string (user, admin)
- password: string

Product

- product id: string
- name: string
- description: string
- price: number / double?
- quantity: number
- category: string
- image: string

Order

- order id: string
- product id: string
- user id: string
- order amount: number
- sum of order: number
- date of order: string
- order/delivery status: string

Orders/Order kopio toimitetuista tilauksista omaksi tauluksi, historia/tilastointitarpeisiin, tai "jos halutaan tehdä esim. materiaalia vaikka markkinointiin " tämä ei ole välttämätön, tämä siis harkinnan mukaan

- order id: string
- product id: string
- user id: string
- order amount: number
- sum of order: number
- date of order: string
- order/delivery status: string

Ids and timestamps are generated automatically by Mongo
