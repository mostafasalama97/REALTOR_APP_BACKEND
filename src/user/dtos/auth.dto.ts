import { IsEmail, IsNotEmpty , IsString , Matches , MinLength } from 'class-validator';
export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]+$/, { message: "Phone number is not in the correct format" })
    phone: string
}