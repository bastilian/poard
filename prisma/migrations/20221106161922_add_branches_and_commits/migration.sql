-- DropIndex
DROP INDEX "Repository_name_gitHubId_idx";

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER,
    "repositoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sha" TEXT NOT NULL,
    CONSTRAINT "Branch_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gitHubId" INTEGER,
    "branchId" TEXT NOT NULL,
    "sha" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "Commit_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_gitHubId_key" ON "Branch"("gitHubId");

-- CreateIndex
CREATE INDEX "Branch_name_sha_gitHubId_idx" ON "Branch"("name", "sha", "gitHubId");

-- CreateIndex
CREATE UNIQUE INDEX "Commit_gitHubId_key" ON "Commit"("gitHubId");

-- CreateIndex
CREATE INDEX "Commit_sha_subject_gitHubId_createdAt_idx" ON "Commit"("sha", "subject", "gitHubId", "createdAt");

-- CreateIndex
CREATE INDEX "Repository_name_createdAt_updatedAt_gitHubId_idx" ON "Repository"("name", "createdAt", "updatedAt", "gitHubId");
