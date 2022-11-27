/*
  Warnings:

  - The primary key for the `MailBox` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[mailId]` on the table `MailBox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mailId` to the `MailBox` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `MailBox_userId_key` ON `MailBox`;

-- AlterTable
ALTER TABLE `MailBox` DROP PRIMARY KEY,
    ADD COLUMN `mailId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`num`, `mailId`);

-- CreateIndex
CREATE UNIQUE INDEX `MailBox_mailId_key` ON `MailBox`(`mailId`);

-- CreateIndex
CREATE INDEX `MailBox_mailId_idx` ON `MailBox`(`mailId`);
