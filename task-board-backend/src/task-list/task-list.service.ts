import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskList } from "./task-list.entity";
import { CreateTaskListDto } from "./dto/create-task-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateTaskListDto } from "./dto/update-task-list.dto";

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private tasksListRepository: Repository<TaskList>
  ) {}

  async findAll(): Promise<TaskList[]> {
    return this.tasksListRepository.find();
  }

  async create(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    const tasksList = this.tasksListRepository.create(createTaskListDto);
    return this.tasksListRepository.save(tasksList);
  }

  async update(
    id: number,
    updateTaskListDto: UpdateTaskListDto
  ): Promise<TaskList> {
    await this.tasksListRepository.update(id, updateTaskListDto);
    const updatedTaskList = await this.tasksListRepository.findOne({
      where: { id },
    });
    if (!updatedTaskList) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTaskList;
  }

  async remove(id: number): Promise<void> {
    await this.tasksListRepository.delete(id);
  }
}
