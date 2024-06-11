import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  NotFoundException,
} from "@nestjs/common";
import { TaskListService } from "./task-list.service";
import { CreateTaskListDto } from "./dto/create-task-list.dto";
import { UpdateTaskListDto } from "./dto/update-task-list.dto";

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

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateTaskListDto: UpdateTaskListDto
  ) {
    const updatedTaskList = await this.taskListService.update(
      id,
      updateTaskListDto
    );
    if (!updatedTaskList) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTaskList;
  }
}
