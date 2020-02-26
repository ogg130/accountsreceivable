IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [DepreciationSchedule] (
    [ID] int NOT NULL IDENTITY,
    [EnteredDate] datetime2 NOT NULL,
    [EnteredById] int NOT NULL,
    [Asset] nvarchar(max) NULL,
    [Type] nvarchar(max) NULL,
    [Term] int NOT NULL,
    CONSTRAINT [PK_DepreciationSchedule] PRIMARY KEY ([ID])
);

GO

CREATE TABLE [Ar] (
    [ID] int NOT NULL IDENTITY,
    [EnteredDate] datetime2 NOT NULL,
    [EnteredById] int NOT NULL,
    [ArNumber] int NOT NULL,
    [CostCenter] int NOT NULL,
    [DirectorId] int NOT NULL,
    [OwnerId] int NOT NULL,
    [Amount] float NOT NULL,
    [Committed] float NOT NULL,
    [EndDate] datetime2 NOT NULL,
    [StartDate] datetime2 NOT NULL,
    [Comments] nvarchar(max) NULL,
    [DepreciationScheduleID] int NULL,
    CONSTRAINT [PK_Ar] PRIMARY KEY ([ID]),
    CONSTRAINT [FK_Ar_DepreciationSchedule_DepreciationScheduleID] FOREIGN KEY ([DepreciationScheduleID]) REFERENCES [DepreciationSchedule] ([ID]) ON DELETE NO ACTION
);

GO

CREATE TABLE [ArStatus] (
    [ID] int NOT NULL IDENTITY,
    [EnteredDate] datetime2 NOT NULL,
    [EnteredById] int NOT NULL,
    [StartDate] datetime2 NOT NULL,
    [EndDate] datetime2 NOT NULL,
    [Status] nvarchar(max) NULL,
    [UserID] int NOT NULL,
    [ArID] int NOT NULL,
    CONSTRAINT [PK_ArStatus] PRIMARY KEY ([ID]),
    CONSTRAINT [FK_ArStatus_Ar_ArID] FOREIGN KEY ([ArID]) REFERENCES [Ar] ([ID]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_Ar_DepreciationScheduleID] ON [Ar] ([DepreciationScheduleID]);

GO

CREATE INDEX [IX_ArStatus_ArID] ON [ArStatus] ([ArID]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200117213718_initial', N'2.2.6-servicing-10079');

GO

