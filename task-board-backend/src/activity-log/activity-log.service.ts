// src/activity-log/activity-log.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActivityLog } from "./activity-log.entity";

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>
  ) {}

  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogRepository.find();
  }

  async createLog(
    action: string,
    entity: string,
    entityId: number,
    description: string
  ): Promise<ActivityLog> {
    const log = this.activityLogRepository.create({
      action,
      entity,
      entityId,
      description,
    });
    return this.activityLogRepository.save(log);
  }
}
