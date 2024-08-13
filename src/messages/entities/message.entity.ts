import { AppConstants } from 'common/constants';
import { User } from 'src/users/entities/user.entity';
import { RandomValueGenerator } from 'src/utils/random-value-generator';
import {
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
   @PrimaryColumn()
   id: string = RandomValueGenerator.generateString(
      AppConstants.MESSAGE_ID_LENGTH,
      AppConstants.CHARACTER_RANGE_FOR_ID,
   );

   @JoinColumn({}) // specify the owner of the relationship. i.e where the foreign key would be created
   // @OneToOne(() => User, (user) => user.message) - needed if we want to have bidirectional relationship so we can access messages from user even tho the foreign key would not exist on user
   @ManyToOne(() => User, { eager: true })
   sender: User;

   @JoinColumn()
   @ManyToOne(() => User, {})
   receiver: User;
}
