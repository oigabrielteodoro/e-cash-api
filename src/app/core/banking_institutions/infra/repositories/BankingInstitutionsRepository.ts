class BankingInstitutionsRepository {
  private bankingInstitutions = [
    {
      id: '403',
      name: 'Cora',
      institutionName: 'Cora SCD',
      institutionUrl: 'https://conta.cora.com.br/',
      imageUrl: 'https://i.ibb.co/0yXxKs0/cora-icon.jpg',
    },
    {
      id: '260',
      name: 'Nubank',
      institutionName: 'NU PAGAMENTOS S.A',
      institutionUrl: 'https://nubank.com.br/',
      imageUrl: 'https://i.ibb.co/4N4YSdd/nu-icon.png',
    },
    {
      id: '380',
      name: 'PicPay',
      institutionName: 'PicPay Serviços S.A',
      institutionUrl: 'https://www.picpay.com/site',
      imageUrl: 'https://i.ibb.co/XZSwcf9/picpay-icon.webp',
    },

    {
      id: '341',
      name: 'Itaú',
      institutionName: 'Itau Unibanco S.A',
      institutionUrl: 'https://www.itau.com.br',
      imageUrl: 'https://i.ibb.co/ctvRBPQ/itau-icon.png',
    },
  ]

  public findAll() {
    return this.bankingInstitutions
  }

  public findById(id: string) {
    return this.bankingInstitutions.find(
      (bankingInstitution) => bankingInstitution.id === id,
    )
  }
}

export { BankingInstitutionsRepository }
