import { Injectable } from "@nestjs/common";
import { TaskList } from "./task-list.entity";
import { CreateTaskListDto } from "./dto/create-task-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async remove(id: number): Promise<void> {
    await this.tasksListRepository.delete(id);
  }
}
