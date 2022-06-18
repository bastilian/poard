-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Repository_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER,
    "repositoryId" TEXT NOT NULL,
    "authorId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "closedAt" DATETIME,
    "mergedAt" DATETIME,
    "lastActivityAt" DATETIME,
    CONSTRAINT "PullRequest_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PullRequest_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_gitHubId_key" ON "Owner"("gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_name_key" ON "Owner"("name");

-- CreateIndex
CREATE INDEX "Owner_name_gitHubId_idx" ON "Owner"("name", "gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_gitHubId_key" ON "User"("gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_gitHubId_idx" ON "User"("username", "gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_gitHubId_key" ON "Repository"("gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_name_key" ON "Repository"("name");

-- CreateIndex
CREATE INDEX "Repository_name_gitHubId_idx" ON "Repository"("name", "gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_gitHubId_key" ON "PullRequest"("gitHubId");

-- CreateIndex
CREATE INDEX "PullRequest_title_gitHubId_createdAt_closedAt_updatedAt_idx" ON "PullRequest"("title", "gitHubId", "createdAt", "closedAt", "updatedAt");
