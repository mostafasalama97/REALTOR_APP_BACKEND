import { SignUpParamsInterface } from './../interface/uses.interface';
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }

    async signUp({ email, password, phone, name }: SignUpParamsInterface) {
        const userExist = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        })
        if (userExist) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // store user in DB
        const user = await this.prismaService.user.create({
            data: {
                name,
                phone,
                email,
                password: hashedPassword,
                user_type: UserType.BUYER
            }
        })

        const token = await jwt.sign({
            name,
            id: user.id
        }, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
            expiresIn: 360000
        })
        return token
    }
}
