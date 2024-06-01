// src/activity-log/activity-log.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column()
  entity: string;

  @Column()
  entityId: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
