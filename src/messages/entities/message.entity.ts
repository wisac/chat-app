import { AppConstants } from 'common/constants';
import { User } from 'src/users/entities/user.entity';
import { RandomValueGenerator } from 'src/utils/random-value-generator';
import {
   AfterInsert,
   Column,
   Entity,
   JoinColumn,
   JoinTable,
   ManyToOne,
   OneToOne,
   PrimaryColumn,
} from 'typeorm';

@Entity()
export class Message {
   @AfterInsert()
   log() { console.log("INSERTED") }



   @PrimaryColumn()
   id: string = RandomValueGenerator.generateString(
      AppConstants.MESSAGE_ID_LENGTH,
      AppConstants.CHARACTER_RANGE_FOR_ID,
   );

   // specify the owner of the relationship. i.e where the foreign key would be created
   // @OneToOne(() => User, (user) => user.message) - needed if we want to have bidirectional relationship so we can access messages from user even tho the foreign key would not exist on user
   @JoinColumn()
   @ManyToOne(() => User, { eager: true })
   sender: User;

   @JoinColumn()
   @ManyToOne(() => User, {})
   receiver: User;

   @Column({
      nullable: true,
   })
   subject: string;

   @Column({
      nullable: true,
   })
   body: string;

   @Column({
      default: false,
      // nullable: true,
   })
   delivered: boolean;

   @Column({
      default: false,
      // nullable: true,
   })
   read: boolean;

   @Column({
      default: false
   })
   starred: boolean;

   @Column({
      nullable: true,
   })
   sentOn: Date;

   @Column({
      nullable: true,
   })
   receivedOn: Date;
}
