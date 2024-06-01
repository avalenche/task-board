import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "../task/task.entity";

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
