import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
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
}
