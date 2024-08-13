import { RandomValueGenerator } from 'src/utils/random-value-generator';
import { Column, Entity, PrimaryColumn, Unique, VirtualColumn } from 'typeorm';

@Entity({ }) // table would be generated as user
export class User {
   @PrimaryColumn({
      unique: true,
   })
   id: string = RandomValueGenerator.generateString(
      10,
      '0123456789abcdefghijklmnopqrstuvwxyz',
   );

   @Column({
      unique: true,
   })
   username: string = RandomValueGenerator.generateString(
      5,
      'abcdefghijklmnopqrstuvwxyz',
   );

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column()
   email: string;

   @Column({
      default: false,
   })
   verifiedEmail: boolean;

   @Column()
   password: string;

   @Column({ nullable: true })
   picture: string;

   @Column({
      default: false,
   })
   online: boolean;

   @VirtualColumn({
      query: () => `SELECT COUNT("id") FROM "message" WHERE "from" = "user.id" `
   })
   totalMessagesSent: number;
}
