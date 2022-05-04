# Opifram_project_R2

Rakenne alustavasti

User
- firstName: string
- lastName: string
- address: string
- phone: string
- email: string
- role: string (user, admin)
- password: string

Category
- name: string
- description: string

Product
- name: string
- description: string
- price: number
- quantity: number
- category: ObjectId
- image: string

Ids and timestamps are generated automatically by Mongo
