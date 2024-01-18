import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    filterTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
        return this.tasks
            .filter(
                task => getTasksFilterDto.status ? 
                    task.status === getTasksFilterDto.status : true
            )
            .filter(
                task => getTasksFilterDto.search ? 
                    task.title.includes(getTasksFilterDto.search) || 
                    task.description.includes(getTasksFilterDto.search) : true
            );            
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
        const task = this.tasks.find(task => task.id === taskId);

        if (! task) {
            throw new NotFoundException(`Task (${taskId}) is not found`);
        }

        return task;
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
