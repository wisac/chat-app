import { IsBoolean, IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import { IsNull } from 'typeorm';
export class CreateUserDto {
   @IsString()
   @Length(2,10)
    firstName: string;

   @Length(2,10)
    lastName: string;

   @IsEmail()
   email: string;

   @IsStrongPassword({
      minLength: 6,
      minSymbols: 0
   }, { message: 'Enter real password' })
   password: string;

   @IsString()
   username: string
}
