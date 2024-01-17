import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Get(':id')
    getTaskById(@Param('id') taskId: string) {
        return this.taskService.getTaskById(taskId);
    }

    @Delete(':id')
    deleteTask(@Param('id') taskId: string): void {
        this.taskService.deleteTask(taskId);
    }

    @Patch(':id/status')
    updateTaskStatus(@Param('id') taskId: string, @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(taskId, status);
    }
}
