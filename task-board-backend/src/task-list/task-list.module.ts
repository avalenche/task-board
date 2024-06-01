import { Module } from "@nestjs/common";
import { TaskListController } from "./task-list.controller";
import { TaskListService } from "./task-list.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskList } from "./task-list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListController],
  providers: [TaskListService],
  exports: [TaskListService],
})
export class TaskListModule {}
