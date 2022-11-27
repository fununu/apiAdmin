-- CreateTable
CREATE TABLE `Cyan` (
    `num` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` INTEGER NULL,

    UNIQUE INDEX `Cyan_userId_key`(`userId`),
    PRIMARY KEY (`num`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Datas` (
    `num` BIGINT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `userData` JSON NOT NULL,
    `agent` VARCHAR(191) NULL,
    `update` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Datas_num_key`(`num`),
    UNIQUE INDEX `Datas_userId_key`(`userId`),
    PRIMARY KEY (`num`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatasImportant` (
    `num` BIGINT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `os` ENUM('Android', 'iOS', 'Unknown') NULL,
    `osLanguage` VARCHAR(191) NULL,
    `language` INTEGER NULL,
    `region` VARCHAR(191) NULL,
    `money` BIGINT NULL,
    `ball` BIGINT NULL,
    `playtime` BIGINT NULL,
    `payed` BOOLEAN NULL,
    `event_Sunlight` BIGINT NULL,
    `wintime` BIGINT NULL,
    `t_score` BIGINT NULL,
    `players` BIGINT NULL,
    `teamname` VARCHAR(191) NULL,
    `version` VARCHAR(191) NULL,
    `update` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DatasImportant_num_key`(`num`),
    UNIQUE INDEX `DatasImportant_userId_key`(`userId`),
    PRIMARY KEY (`num`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Datas` ADD CONSTRAINT `Datas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Cyan`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DatasImportant` ADD CONSTRAINT `DatasImportant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Cyan`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
