IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF SCHEMA_ID(N'iris') IS NULL EXEC(N'CREATE SCHEMA [iris];');
GO

CREATE TABLE [iris].[Task] (
    [Id] int NOT NULL IDENTITY,
    [Description] nvarchar(max) NOT NULL,
    [IsCompleted] bit NOT NULL,
    [IsFavorite] bit NOT NULL,
    [DeadlineAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241215120152_InitialMigration', N'8.0.11');
GO

COMMIT;
GO

