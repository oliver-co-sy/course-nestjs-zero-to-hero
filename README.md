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

- Generate a new service using the NestJS CLI
    ```
    $ nest g service tasks
    ```
- Implemented as a provider (registered in the module decorator) that can be injected to other classes if decorated with `@Injectable` (Note that not all providers are services)

### NestJS Pipes ###

- Used to validate or to transform data before calling the controller method
- Can throw an exception instead of invoking the controller method
- [NestJS Pipes Documentation](https://docs.nestjs.com/pipes)
- To validate DTOs, use npm to install `class-validator` and `class-transformer`
- For DTO validation, add `app.useGlobalPipes(new ValidationPipe());` to the `main.ts` file to register the validation pipe
- See the [documentation](https://github.com/typestack/class-validator) for more
