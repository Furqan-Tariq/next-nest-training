import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../user/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
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

async findPendingByUserId(userId: number): Promise<Task[]> {
  return this.taskRepository.find({
    where: { user: { id: userId }, is_completed: false },
    relations: ['user'],
  });
}

async findPendingById(id: number): Promise<Task> {
  const task = await this.taskRepository.findOne({
    where: { id, is_completed: false },
    relations: ['user'],
  });
  if (!task) {
    throw new NotFoundException('Pending task not found');
  }
  return task;
}
async deleteTaskById(id: number): Promise<{ message: string }> {
  const result = await this.taskRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException('Task not found');
  }
  return { message: 'Task deleted successfully' };
}

async updateTaskById(id: number, updateTaskDto: UpdateTaskDto): Promise<{ message: string }> {
  const result = await this.taskRepository.update(id, updateTaskDto);
  if (result.affected === 0) {
    throw new NotFoundException('Task not found');
  }
  return { message: 'Task updated successfully' };
}

}
