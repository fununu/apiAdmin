-- CreateTable
CREATE TABLE `MailBox` (
    `num` BIGINT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL,
    `state` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MailBox_num_key`(`num`),
    UNIQUE INDEX `MailBox_userId_key`(`userId`),
    PRIMARY KEY (`num`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
