import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from "./task/task.module";
import { TaskListModule } from "./task-list/task-list.module";
import { Task } from "./task/task.entity";
import { TaskList } from "./task-list/task-list.entity";
import { ActivityLog } from "./activity-log/activity-log.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Task, TaskList, ActivityLog],
      synchronize: true,
    }),
    TaskModule,
    TaskListModule,
    ActivityLog,
  ],
})
export class AppModule {}
