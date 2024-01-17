import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {

    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;

        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    getTaskById(taskId: string): Task {
        return this.tasks.find(task => task.id === taskId);
    }

    deleteTask(taskId: string): void {
        const task = this.getTaskById(taskId);
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
    }

    updateTaskStatus(taskId: string, status: TaskStatus): Task {
        const task = this.getTaskById(taskId);
        task.status = status;
        return task;
    }
}
