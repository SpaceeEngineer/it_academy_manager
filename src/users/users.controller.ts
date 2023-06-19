import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Inject,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/IUser';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { IUserService } from './interfaces/IUserService';
import { IUserPagination } from './interfaces/IUserPagination';
import { USER_SERVICE } from 'src/shared/constants/serviceConstants';
import { EditUserProfileDto } from './dto/edit-user-profile.dto';
import { RoleEnum } from '../roles/roles.enum';
import { Roles } from 'src/roles/roles.auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthUser } from '../auth/decorators/user.decorator';
import { ICourse } from '../courses/interfaces/ICourse';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiTags('Users')
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiSecurity('JWT-auth')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: IUserService,
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'create user' })
  @ApiCreatedResponse({ description: 'The user has been successfully created' })
  @ApiConflictResponse({ description: 'Such user already exists' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('my-profile')
  @ApiOperation({ summary: 'get profile information' })
  @ApiOkResponse({ description: 'The user profile information has been successfully returned' })
  @ApiNotFoundResponse({ description: 'User not found' })
  myProfile(@Req() req): Promise<IUser> {
    return this.usersService.getMyProfileInfo(req.user);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiOkResponse({ description: 'The list of users has been successfully returned' })
  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @Get()
  index(@Query('page') page = 1, @Query('limit') limit = 10): Promise<IUserPagination> {
    limit = limit > 100 ? 100 : limit;
    return this.usersService.getAll({
      page,
      limit,
      route: `${process.env.URL}/users`,
    });
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiOkResponse({ description: 'The user has been successfully returned' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  getOneById(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    return this.usersService.getUserForManager(id);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'update user' })
  @ApiOkResponse({ description: 'The user has been successfully updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConflictResponse({
    description: 'Update has been failed. User with given email is already exist',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.usersService.updateUserInfoByManager(id, updateUserDto);
  }

  @Roles(RoleEnum.MANAGER)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'delete user' })
  @ApiOkResponse({ description: 'The user has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Validation failed(id expected as numeric string)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Roles(RoleEnum.USER)
  @UseGuards(RolesGuard)
  @Post('editprofile')
  @ApiBody({ type: EditUserProfileDto })
  @ApiOperation({ summary: 'Edit profile' })
  @ApiOkResponse({ description: 'The profile has been successfully edited' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  editUserProfile(@Req() req, @Body() editUserProfileDto: EditUserProfileDto): Promise<boolean> {
    const { id } = req.user;
    return this.usersService.editUserProfile(id, editUserProfileDto);
  }
  @Roles(RoleEnum.USER)
  @ApiOperation({ summary: 'get my courses' })
  @ApiOkResponse({ description: 'The list of my courses has been successfully returned' })
  @Get(':userId/courses')
  async getAllMyCourses(@AuthUser() authUser: IUser): Promise<ICourse[]> {
    return this.usersService.getAllMyCourses(authUser);
  }
}
