import { Message } from 'src/messages/entities/message.entity';
import { RandomValueGenerator } from 'src/utils/random-value-generator';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, Unique, VirtualColumn } from 'typeorm';

@Entity({ }) // table would be generated as user
export class User {
   @PrimaryColumn({
      unique: true,
   })
   id: string = RandomValueGenerator.generateString(
      10
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
      query: () => `SELECT COUNT("id") FROM "message" WHERE "senderId" = "user.id" `
   })

      // sepecify the inverse side of the relationship. i.e the field which the foreign key
   // @OneToOne(type => Message, message => message.sender)
      // message: Message


   @OneToMany(()=> Message,message => message.sender)
   sentMessages: Message[]

   @OneToMany(()=> Message, message=> message.receiver)
      
      
   totalMessagesSent: number;
}
