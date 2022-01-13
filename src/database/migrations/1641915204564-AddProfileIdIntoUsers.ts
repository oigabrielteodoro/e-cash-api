import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddProfileIdIntoUsers1641915204564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'profile_id',
        type: 'uuid',
        isNullable: false,
        isUnique: true,
      }),
    )

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'AddProfileIdIntoUsers',
        columnNames: ['profile_id'],
        referencedTableName: 'user_profiles',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'AddProfileIdIntoUsers')

    await queryRunner.dropColumn('users', 'profile_id')
  }
}
