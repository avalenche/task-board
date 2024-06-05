// seeds/seed.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { TaskService } from "../task/task.service";
import { TaskListService } from "../task-list/task-list.service";
import { CreateTaskDto } from "../task/dto/create-task.dto";
import { CreateTaskListDto } from "../task-list/dto/create-task-list.dto";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const taskService = app.get(TaskService);
  const taskListService = app.get(TaskListService);

  const taskListDto: CreateTaskListDto = { name: "To Do" };
  const taskList = await taskListService.create(taskListDto);

  const tasks: CreateTaskDto[] = [
    {
      name: "First Task",
      description: "This is the first task",
      dueDate: "2024-06-01",
      priority: "High",
      idTaskList: taskList.id,
    },
    {
      name: "Second Task",
      description: "This is the second task",
      dueDate: "2024-06-02",
      priority: "Medium",
      idTaskList: taskList.id,
    },
  ];

  for (const task of tasks) {
    await taskService.create(task);
  }

  await app.close();
}

bootstrap();
