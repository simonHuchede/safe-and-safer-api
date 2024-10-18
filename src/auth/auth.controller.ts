import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'User login' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'simon' },
                password: { type: 'string', example: 'Password123' },
            },
        },
    })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        console.log(signInDto);
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Access protected route' })
    @Post('protected')
    accessProtectedRoute(@Request() req: any) {
        return { message: 'You have accessed a protected route', user: req.user };
    }

}