import { IsString, Length } from 'class-validator';
import { AppConstants } from 'common/constants';

export class CreateMessageDto {
   @IsString()
   @Length(AppConstants.USER_ID_LENGTH, AppConstants.USER_ID_LENGTH)
   senderId: string;

   @IsString()
   @Length(AppConstants.USER_ID_LENGTH, AppConstants.USER_ID_LENGTH)
   receiverId: string;
}
