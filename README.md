# NestJS: Zero to Hero #

### Creating a Project ###

- Install NestJS CLI
    ```
    $ npm install -g @nestjs/cli
    ```
- Create a new project using the NestJS CLI and start in dev mode
    ```
    $ nest new nestjs-task-management
    $ cd nestjs-task-management
    $ npm run start:dev
    ```

### NestJS Module ###

- Generate a new module using the NestJS CLI
    ```
    $ nest g module tasks
    ```
- A class decorated with the `@Module` decorator
- Module decorator has the following properties:
    - `providers` - array of injectable objects, like services, in this module
    - `controllers` - array of REST controllers in this module
    - `imports` - array of modules that this module depends on (Allows this module to inject exported providers from the imported modules)
    - `exports` - array of providers that this module exposes

    Example:
    ```
    @Module({
        providers: [EmailService],
        controllers: [AccountController],
        imports: [
            AuthModule
        ],
        exports: [EmailService]
    })
    ```

    ### NestJS Controller ###

    - Generate a new controller using the NestJS CLI
        ```
        $ nest g controller tasks
        ```
    - A class decorated with the `@Controller` decorator
    - Associates the controller class to an HTTP context path
    - Controller class contains methods decorated with relevant HTTP verb

    ### NestJS Service ###

    - Implemented as a provider (registered in the module decorator) that can be injected to other classes if decorated with `@Injectable` (Note that not all providers are services)