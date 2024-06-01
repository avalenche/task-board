// src/task/dto/update-task.dto.ts
export class UpdateTaskDto {
  readonly name?: string;
  readonly description?: string;
  readonly dueDate?: string;
  readonly priority?: string;
  readonly taskListId?: number;
}
