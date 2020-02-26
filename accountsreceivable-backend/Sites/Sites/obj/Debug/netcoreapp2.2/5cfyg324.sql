IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Site] (
    [SiteID] int NOT NULL IDENTITY,
    [EnteredDate] datetime2 NOT NULL,
    [EnteredById] int NOT NULL,
    [Name] nvarchar(max) NULL,
    [Code] nvarchar(max) NULL,
    CONSTRAINT [PK_Site] PRIMARY KEY ([SiteID])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200117213736_initial', N'2.2.6-servicing-10079');

GO

