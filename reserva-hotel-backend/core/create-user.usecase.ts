import { User } from './user.entity';

export interface CreateUserUseCase {
  execute(user: Omit<User, 'id'>): Promise<User>;
}
