import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddMonthlyIncomeColumnIntoUserProfile1645652137094
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_profiles',
      new TableColumn({
        name: 'monthly_income',
        type: 'varchar',
        isNullable: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_profiles', 'monthly_income')
  }
}
