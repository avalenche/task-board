// src/task/dto/create-task.dto.ts
export class CreateTaskDto {
  readonly name: string;
  readonly description: string;
  readonly dueDate: string;
  readonly priority: string;
  readonly taskListId: number;
}
