IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [User] (
    [UserID] int NOT NULL IDENTITY,
    [EnteredDate] datetime2 NOT NULL,
    [EnteredById] int NOT NULL,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [UserName] nvarchar(max) NULL,
    [Password] nvarchar(max) NULL,
    [SiteID] int NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([UserID])
);

GO

CREATE TABLE [PhoneNumber] (
    [ID] int NOT NULL IDENTITY,
    [EnteredDate] datetime2 NOT NULL,
    [EnteredById] int NOT NULL,
    [Type] nvarchar(max) NULL,
    [Number] nvarchar(max) NULL,
    [UserID] int NOT NULL,
    CONSTRAINT [PK_PhoneNumber] PRIMARY KEY ([ID]),
    CONSTRAINT [FK_PhoneNumber_User_UserID] FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_PhoneNumber_UserID] ON [PhoneNumber] ([UserID]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20200117213745_initial', N'2.2.6-servicing-10079');

GO

