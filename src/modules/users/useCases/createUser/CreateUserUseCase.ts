import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userFoundWithEmail = this.usersRepository.findByEmail(email);

    if (userFoundWithEmail) {
      throw new Error("There is already a user with the given email");
    }

    const userCreated = this.usersRepository.create({
      name,
      email,
    });

    return userCreated;
  }
}

export { CreateUserUseCase };
