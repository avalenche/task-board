import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { TaskListService } from "./task-list.service";
import { CreateTaskListDto } from "./dto/create-task-list.dto";

@Controller("task-list")
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  findAll() {
    return this.taskListService.findAll();
  }

  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListService.create(createTaskListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.taskListService.remove(id);
  }
}
