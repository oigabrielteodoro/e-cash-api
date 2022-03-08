import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeBankingAgencyAndBankingAccountIntoAccounts1646764201759
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'accounts',
      'banking_agency',
      'agency_number',
    )
    await queryRunner.renameColumn(
      'accounts',
      'banking_account',
      'account_number',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'accounts',
      'agency_number',
      'banking_agency',
    )
    await queryRunner.renameColumn(
      'accounts',
      'account_number',
      'banking_account',
    )
  }
}
