// filepath: d:\training-2\task-management-day2\src\task\dto\create-task.dto.ts
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  is_completed?: boolean;

  @IsInt()
  user_id: number;
}