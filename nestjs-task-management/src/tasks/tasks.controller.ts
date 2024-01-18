import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(getTasksFilterDto).length) {
            return this.taskService.filterTasks(getTasksFilterDto);
        }

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
    updateTaskStatus(@Param('id') taskId: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {            
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(taskId, status);
    }
}
