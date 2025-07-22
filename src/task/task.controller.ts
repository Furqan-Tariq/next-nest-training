import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

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

@Get('user/:userId')
async getTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
  return this.taskService.findByUserId(Number(userId));
}

@Get('user/:userId/pending')
async getPendingTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
  return this.taskService.findPendingByUserId(Number(userId));
}
@Get('pending/:id')
async getPendingTaskById(@Param('id') id: string): Promise<Task> {
  return this.taskService.findPendingById(Number(id));
}

@Put('/deleteTask/:id')
async deleteTask(@Param('id') id: string): Promise<{ message: string }> {
  return this.taskService.deleteTaskById(Number(id));
}

@Put('/updateTask/:id')
async updateTask(
  @Param('id') id: string,
  @Body() updateTaskDto: UpdateTaskDto,
): Promise<{ message: string }> {
  return this.taskService.updateTaskById(Number(id), updateTaskDto);
}
}
