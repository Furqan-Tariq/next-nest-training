import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }
  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('active')
  async getActiveTasks(): Promise<Task[]> {
    return this.taskService.findActive();
  }

  @Get(':id')
async getTaskById(@Param('id') id: string): Promise<Task> {
  return this.taskService.findOne(Number(id));
}
}
