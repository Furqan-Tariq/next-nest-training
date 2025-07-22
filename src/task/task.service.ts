import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: createTaskDto.user_id } });
    if (!user) {
      throw new Error('User not found');
    }
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      user: user,
    });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
  return this.taskRepository.find({ relations: ['user'] });
}


async findActive(): Promise<Task[]> {
  return this.taskRepository.find({ where: { status: 'active' }, relations: ['user'] });
}

async findOne(id: number): Promise<Task> {
  const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
  if (!task) {
    throw new NotFoundException('Task not found');
  }
  return task;
}

async findByUserId(userId: number): Promise<Task[]> {
  return this.taskRepository.find({
    where: { user: { id: userId } },
    relations: ['user'],
  });
}
}
