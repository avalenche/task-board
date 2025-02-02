// src/activity-log/activity-log.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityLog } from "./activity-log.entity";
import { ActivityLogService } from "./activity-log.service";
import { ActivityLogController } from "./activity-log.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog])],
  providers: [ActivityLogService],
  controllers: [ActivityLogController],
})
export class ActivityLogModule {}
