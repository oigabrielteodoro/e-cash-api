export type BankingInstitution = {
  id: string
  name: string
  institutionName: string
  institutionUrl: string
  imageUrl: string
}

export type BankingInstitutionsRepositoryProvider = {
  findAll: () => BankingInstitution[]
  findById: (id: string) => BankingInstitution | undefined
}
